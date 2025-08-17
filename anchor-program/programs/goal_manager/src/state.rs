use anchor_lang::prelude::*;


#[account]
pub struct Goal{
    pub creator: Pubkey,
    pub title: String,
    pub deadline: i64, 
    pub description: String, //short description
    pub stake_vault: PubKey, //PDA vault holding the staked tokens
    pub stake_amount: u64,
    pub status: GoalStatus, 
    pub rules_uri: String, // offchain link to rules
    pub total_stake: u64 //total amount staked
}

impl Goal{
    pub const MAX_TITLE_LEN: usize = 100;
    pub const MAX_URI_LEN: usize = 200;
    pub const MAX_DESCRIPTION_LEN: usize = 500;
    pub const SIZE: usize = 8 //discriminator
    + 32 //creator
    + 4 + Self::MAX_TITLE_LEN // title string
    + 4 + Self::MAX_DESCRIPTION_LEN 
    + 8 // deadline
    + 32 // stake vault pubkey
    + 1 // status enum
    + 4 + Self::MAX_URI_LEN // rules_uri string
    + 8  // total stake
    + 8; // stake_amount;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum GoalStatus{
    Pending,
    Completed,
    Failed
}

#[account]
pub struct GoalParticipant {
    pub goal: Pubkey, // The Goal Acc this participant joined
    pub participant: Pubkey,
    pub stake_amount: u64,
}

impl GoalParticipant {
    pub const SIZE: usize = 8 + 32 + 32 + 8; // discriminator + 3 fields
}