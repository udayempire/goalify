use anchor_lang::prelude::*;
#[account]
pub struct Goal{
    creator: Pubkey,
    title: String,
    description: String,
    rules_url: String,
    stake_amount: u64,
    start_date: i64,
    end_date: i64,//unix timestamp
    status: GoalStatus,
    max_participants: u16,
    vault_bump: u8
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
        + 8  // start_date
        + 8  // end_date
        + 1  // status enum
        + 2  // max_participants
        + 1; // vault_bump
}
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum GoalStatus{
    Scheduled,  
    Ongoing, 
    Completed, 
    Cancelled
}