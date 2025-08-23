use anchor_lang::prelude::*;
#[account]
pub struct Goal{
    pub creator: Pubkey,
    pub title: String,
    pub description: String,
    pub rules_url: String,
    pub stake_amount: u64,
    pub stake_mint: Pubkey,
    pub start_date: i64,
    pub end_date: i64,//unix timestamp
    pub status: GoalStatus,
    pub max_participants: u16,
    pub current_participants: u16,
    pub bump: u8
}

impl Goal {
    pub const MAX_TITLE_LEN: usize = 64;
    pub const MAX_DESCRIPTION: usize = 500;
    pub const MAX_RULES_LEN: usize = 200;

    pub const SIZE: usize = 8  // discriminator bytes
        + 32                   // creator pubkey
        + 4 + Self::MAX_TITLE_LEN
        + 4 + Self::MAX_DESCRIPTION
        + 4 + Self::MAX_RULES_LEN
        + 8  // stake_amount
        + 32 //stake mint
        + 8  // start_date
        + 8  // end_date
        + 1  // status enum
        + 2  // max_participants
        + 2  // current_participants
        + 1; // vault_bump
}
#[derive(AnchorSerialize, AnchorDeserialize,Clone,PartialEq, InitSpace)]
pub enum GoalStatus{
    Scheduled,  
    Ongoing, 
    Completed, 
    Cancelled
}

#[account]
pub struct Vault {
pub goal: Pubkey,
pub bump: u8,
}

impl Vault { 
    pub const SIZE: usize = 8 + 32 + 1; 
}
#[account]
pub struct Participant{
    pub goal: Pubkey,
    pub user: Pubkey,
    // pub stake: u64,
    pub proof_uri: Option<String>,
    pub proof_submitted_at: Option<i64>,
    pub verified: Option<bool>,
    pub claimed: Option<bool>,
    pub joined_at: i64,
}

impl Participant{
    pub const MAX_PROOF_URI_LENGTH: usize = 200;
    pub const SIZE: usize = 8 
    +32 
    +32
    // +4
    +8
    +1 + 4 + Self::MAX_PROOF_URI_LENGTH
    +1+8 // tag+value
    +1+1
    +1+1
    +8;
}