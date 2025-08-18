use anchor_lang::prelude::*;

//reward token mint per goal 
#[account]
pub struct RewardMint {
    pub goal : Pubkey, //associcated pubkey
    pub mint: Pubkey,
    pub authority: Pubkey,
    pub total_supply: u64
}

impl RewardMint {
    pub const SIZE: usize =  8 +32 +32 +32+8;
}


