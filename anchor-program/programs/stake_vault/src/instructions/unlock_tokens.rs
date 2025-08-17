use anchor_lang::prelude::*;
use crate::state::{UserStake, StakeVault};
use crate::errors::StakeVaultError;

#[derive(Accounts)]
pub struct UnlockTokens<'info> {
    #[account(mut)]
    pub stake_vault: Account<'info, StakeVault>,

    #[account(
        mut,
        seeds = [b"user_stake", stake_vault.key().as_ref(), user.key().as_ref()],
        bump,
    )]
    pub user_stake: Account<'info, UserStake>,

    #[account(mut)]
    pub user: Signer<'info>,
}

pub fn handler(ctx: Context<UnlockTokens>, amount: u64) -> Result<()> {
    let vault = &mut ctx.accounts.stake_vault;
    let user_stake = &mut ctx.accounts.user_stake;

    // Ensure user has enough staked
    require!(user_stake.amount >= amount, StakeVaultError::InsufficientBalance);

    // Update bookkeeping: reduce user stake, reduce vault total
    user_stake.amount = user_stake.amount
        .checked_sub(amount)
        .ok_or(StakeVaultError::Overflow)?;

    vault.total_staked = vault.total_staked
        .checked_sub(amount)
        .ok_or(StakeVaultError::Overflow)?;

    // (If you want, you can mark in UserStake an extra field like `unlocked_amount` here.)

    Ok(())
}
