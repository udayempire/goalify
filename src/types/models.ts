export interface UserPayload {
    username: string;
    walletAddress: string;
    reputation: number;
    createdAt: string;   
  }
  
  export interface PinataResponse {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
  }
  
  export interface NormalizedPin {
    ipfsHash: string;        
    ipfsUrl: string;          
  }
  
  export interface Goal {
    id: string;
    title: string;
    description: string;
    rules: string[];
    stakeAmount: number;
    goalCreatorWalletAddress: string;
    registrationDate: string;  
    endDate: string;          
    status: GoalStatus;
    participants: string[];    
    createdAt: string;         
    updatedAt: string;         
  }

  export enum GoalStatus {
    ToBeStarted = 'toBeStarted',
    Active       = 'active',
    Completed    = 'completed',
    Cancelled    = 'cancelled',
  }

  export interface GoalParticipant {
    walletAddress: string;
    stakeAmount: number;
    status: GoalParticipantStatus;
    createdAt: string;   
    updatedAt: string;   
  }
  
  export enum GoalParticipantStatus {
    Pending   = 'pending',
    Completed = 'completed',
    Failed    = 'failed',
  }
  