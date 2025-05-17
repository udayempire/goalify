// app/api/goals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pinJSONToIPFS } from '@/lib/pinata';
import { GoalStatus, type Goal } from '@/types/models';

// In-memory store of all goals
const goalIndex: Array<{ goalId: string; ipfsUrl: string; data: Omit<Goal, 'id'> }> = [];

// GET  /api/goals → list all
export async function GET() {
  return NextResponse.json({ success: true, goals: goalIndex });
}

// POST /api/goals → create & pin
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

    // … your existing validation …

    const now = new Date().toISOString();
    const goalPayload: Omit<Goal, 'id'> = {
      title,
      description,
      rules,
      stakeAmount,
      goalCreatorWalletAddress,
      registrationDate,
      endDate,
      participants,
      status: GoalStatus.ToBeStarted,
      createdAt: now,
      updatedAt: now,
    };

    const pinataResponse = await pinJSONToIPFS(goalPayload);
    const ipfsHash = pinataResponse.IpfsHash;
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

    // Save into our in-memory index
    goalIndex.push({ goalId: ipfsHash, ipfsUrl, data: goalPayload });

    return NextResponse.json(
      { success: true, goalId: ipfsHash, ipfsUrl, pinnedGoal: goalPayload },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating goal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create goal', message: error },
      { status: 500 }
    );
  }
}
