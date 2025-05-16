import { NextRequest, NextResponse } from 'next/server';
import { pinJSONToIPFS } from '@/lib/pinata';

// Temporary in-memory user index (for demonstration)
const userIndex: Record<string, { username: string; walletAddress: string; ipfsHash: string; ipfsUrl?: string }> = {};

// GET - Check if user exists by walletAddress
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('walletAddress');
  if (!walletAddress) {
    return NextResponse.json({ success: false, error: 'walletAddress is required' }, { status: 400 });
  }
  const user = userIndex[walletAddress];
  if (user) {
    return NextResponse.json({ success: true, user });
  } else {
    return NextResponse.json({ success: false, user: null });
  }
}

// POST - Pin new user data to IPFS
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, walletAddress } = body as { username: string; walletAddress: string };

    if (!username || !walletAddress || typeof username !== 'string' || typeof walletAddress !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid username and walletAddress strings are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (userIndex[walletAddress]) {
      return NextResponse.json(
        { success: false, error: 'User already exists', user: userIndex[walletAddress] },
        { status: 409 }
      );
    }

    const userPayload = {
      username,
      walletAddress,
      reputation: 0,
      createdAt: new Date().toISOString(),
    } as const;

    const { ipfsHash, ipfsUrl } = await pinJSONToIPFS(userPayload);

    // Save to in-memory index
    userIndex[walletAddress] = { username, walletAddress, ipfsHash, ipfsUrl };

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
