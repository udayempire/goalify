use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer, Mint};
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

    /// User’s token account from which tokens will be transferred
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    /// Vault token account (owned by StakeVault PDA)
    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<StakeTokens>, amount: u64) -> Result<()>{
    let vault = &mut ctx.accounts.stake_vault;
    let user_stake = &mut ctx.accounts.user_stake;

    //transfer tokens form user to vault
    let cpi_accounts = Transfer{
        from: ctx.accounts.user_token_account.to_account_info(),
        to: ctx.accounts.vault_token_account.to_account_info(),
        authority: ctx.accounts.user.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, amount)?;

    // Update vault total
    vault.total_staked = vault.total_staked.checked_add(amount).ok_or(StakeVaultError::Overflow)?;

    //update user record
    user_stake.user = ctx.accounts.user.key();
    user_stake.vault = vault.key();
    user_stake.amount = user_stake.amount.checked_add(amount).ok_or(StakeVaultError::Overflow)?;

    Ok(())
}