use anchor_lang::prelude::*;

#[account]
pub struct GoalProof {
    pub goal: Pubkey,
    pub is_verified: bool,
}

impl GoalProof {
    pub const SIZE: usize = 8 + 32 + 1; // discriminator + goal pubkey + bool
}

#[account]
pub struct Goal {
    pub creator: Pubkey,
    pub title: String,
    pub deadline: i64,
    pub status: GoalStatus,
    pub proof_submitted: bool,        // true if proof was submitted
    pub proof_submission_time: i64,   // timestamp of submitted proof
}

impl Goal {
    pub const MAX_TITLE_LEN: usize = 100;
    pub const SIZE: usize = 8      // discriminator
        + 32                      // creator
        + 4 + Self::MAX_TITLE_LEN // title string
        + 8                       // deadline
        + 1                       // status enum
        + 1                       // proof_submitted
        + 8;                      // proof_submission_time
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum GoalStatus {
    Pending,
    Completed,
    Failed,
}
