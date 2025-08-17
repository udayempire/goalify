use anchor_lang::prelude::*;
use crate::state::{StakeVault, UserStake};
use crate::errors::StakeVaultError;

#[derive(Accounts)]
pub struct StakeTokens<'info> {
    #[account(mut)]
    pub stake_vault: Account<'info, StakeVault>,

    #[account(
        init,
        payer = user,
        space = UserStake::SIZE,
        seeds = [b"user_stake", stake_vault.key().as_ref(), user.key().as_ref()],
        bump,
    )]
    pub user_stake: Account<'info,UserStake>,
    #[account(mut)]
    pub user : Signer<'info>,
    pub system_program: Program<'info, System>
}

pub fn handler(ctx: Context<StakeTokens>, amount: u64) -> Result<()>{
    let vault = &mut ctx.accounts.stake_vault;
    let user_stake = &mut ctx.accounts.user_stake;
    require!(user_stake.amount >= amount, StakeVaultError::InsufficientBalance);

    user_stake.amount -= amount;
    
}