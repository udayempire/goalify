import { NextRequest, NextResponse } from 'next/server';
import { pinJSONToIPFS } from '@/lib/pinata';

// GET - For example purposes, returns a static message or fetch from a saved log
export async function GET() {
  return NextResponse.json({ success: true, message: 'Use POST to pin user data to IPFS' });
}

// POST - Pin new user data to IPFS
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Add type checking for the request body
    const { username, walletAddress } = body as { username: string; walletAddress: string };

    if (!username || !walletAddress || typeof username !== 'string' || typeof walletAddress !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid username and walletAddress strings are required' },
        { status: 400 }
      );
    }

    const userPayload = {
      username,
      walletAddress,
      reputation: 0,
      createdAt: new Date().toISOString(),
    } as const; // Make the object type more strict

    const { ipfsHash, ipfsUrl } = await pinJSONToIPFS(userPayload);

    return NextResponse.json({
      success: true,
      ipfsHash,
      ipfsUrl,
      pinnedData: userPayload,
    }, { status: 201 });
  } catch (error: any) {
    console.error('IPFS Pinning Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to pin data to IPFS', message: error.message },
      { status: 500 }
    );
  }
}
