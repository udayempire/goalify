export interface UserPayload {
  username: string;
  walletAddress: string;
  ipfsHash: string;
  ipfsUrl: string;
  reputation: number;
  createdAt: string;
  updatedAt: string;
}

export interface PinataResponse {
  IpfsHash: string;
  ipfsUrl: string;
}

