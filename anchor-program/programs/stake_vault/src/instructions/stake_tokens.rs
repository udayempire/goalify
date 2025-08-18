use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
use crate::state::{StakeVault, UserStake};
use crate::errors::StakeVaultError;

#[derive(Accounts)]
pub struct StakeTokens<'info> {
    /// PDA representing the stake vault
    #[account(mut)]
    pub stake_vault: Account<'info, StakeVault>,

    /// Each user's staking record
    #[account(
        init,
        payer = user,
        space = UserStake::SIZE,
        seeds = [b"user_stake", stake_vault.key().as_ref(), user.key().as_ref()],
        bump,
    )]
    pub user_stake: Account<'info, UserStake>,

    /// User paying the stake
    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<StakeTokens>, amount: u64) -> Result<()> {
    let vault = &mut ctx.accounts.stake_vault;
    let user_stake = &mut ctx.accounts.user_stake;

    // Transfer lamports from user to vault PDA
    transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.user.to_account_info(),
                to: ctx.accounts.stake_vault.to_account_info(),
            },
        ),
        amount,
    )?;

    // Update vault total
    vault.total_staked = vault
        .total_staked
        .checked_add(amount)
        .ok_or(StakeVaultError::Overflow)?;

    // Update user record
    user_stake.user = ctx.accounts.user.key();
    user_stake.goal = vault.goal;
    user_stake.amount = user_stake
        .amount
        .checked_add(amount)
        .ok_or(StakeVaultError::Overflow)?;

    Ok(())
}
