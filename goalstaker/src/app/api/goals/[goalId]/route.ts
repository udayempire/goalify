// app/api/goals/[goalId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { Goal } from '@/types/models';

// GET: Retrieve a pinned goal from IPFS by CID
export async function GET(
  _request: NextRequest,
  { params }: { params: { goalId: string } }
) {
  try {
    const { goalId } = params;
    const res = await fetch(`https://gateway.pinata.cloud/ipfs/${goalId}`);
    if (!res.ok) throw new Error(`IPFS fetch failed: ${res.status}`);
    const goal: Goal = await res.json();
    return NextResponse.json({ success: true, goal });
  } catch (err) {
    console.error('Error fetching goal:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch goal', message: err },
      { status: 500 }
    );
  }
}

