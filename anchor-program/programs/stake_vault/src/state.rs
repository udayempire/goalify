use anchor_lang::prelude::*;

#[account]
pub struct StakeVault {
    pub goal: Pubkey,
    pub total_staked: u64,
    pub treasury: Pubkey,
    pub whitelist_mint: Pubkey,
}

impl StakeVault {
    pub const SIZE: usize = 8 + 32 + 8 + 32 + 32;
}

#[account]

pub struct UserStake {
    pub user: Pubkey,
    pub goal: Pubkey,
    pub amount: u64,
}

impl UserStake {
    pub const SIZE: usize = 8 + 32 + 32 + 8;
}

#[account]
pub struct TreasuryVault {
    pub treasury_owner : Pubkey, //DAO treasury authority
    pub balance: u64
}

impl TreasuryVault {
    pub const SIZE: usize = 8 + 32 + 8;
}



