// app/api/goals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pinJSONToIPFS } from '@/lib/pinata';
import { Goal, GoalStatus } from '@/types/models';

// POST: Create and pin a new goal to IPFS
export async function POST(request: NextRequest) {
  try {
    const {
      title,
      description,
      rules,
      stakeAmount,
      goalCreatorWalletAddress,
      registrationDate,
      endDate,
      participants,
    } = (await request.json()) as Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'status'>;

    // Basic validation
    if (
      !title ||
      typeof description !== 'string' ||
      !Array.isArray(rules) ||
      rules.some(r => typeof r !== 'string') ||
      typeof stakeAmount !== 'number' ||
      typeof goalCreatorWalletAddress !== 'string' ||
      !Array.isArray(participants) ||
      participants.some(p => typeof p !== 'string') ||
      typeof registrationDate !== 'string' ||
      typeof endDate !== 'string'
    ) {
      return NextResponse.json({ success: false, error: 'Invalid goal data' }, { status: 400 });
    }

    const now = new Date();
    const registrationDateTime = new Date(registrationDate);
    const endDateTime = new Date(endDate);
    
    // Determine status based on dates
    let status;
    if (now < registrationDateTime) {
      status = GoalStatus.ToBeStarted;
    } else if (now >= registrationDateTime && now <= endDateTime) {
      status = GoalStatus.Active;
    } else {
      status = GoalStatus.Completed;
    }

    const goalPayload: Omit<Goal, 'id'> = {
      title,
      description,
      rules,
      stakeAmount,
      goalCreatorWalletAddress,
      registrationDate,
      endDate,
      participants,
      status, // Use the determined status
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const ipfsHash = await pinJSONToIPFS(goalPayload);
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

    return NextResponse.json(
      { success: true, goalId: ipfsHash, ipfsUrl, pinnedGoal: goalPayload },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error creating goal:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to create goal', message: err },
      { status: 500 }
    );
  }
}


