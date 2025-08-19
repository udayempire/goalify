use anchor_lang::prelude::*;
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
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum GoalStatus{
    Scheduled,  
    Ongoing, 
    Completed, 
    Cancelled
}