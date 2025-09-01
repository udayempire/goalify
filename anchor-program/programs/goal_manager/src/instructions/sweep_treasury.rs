#![allow(deprecated)]
#![allow(unexpected_cfgs)]
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use crate::errors::SweepTreasuryError;

use crate::state::{Goal, ProgramConfig, Vault};

#[derive(Accounts)]
pub struct SweepTreasury<'info> {
    // global config so we can check admin / treasury pubkey
    pub config: Account<'info, ProgramConfig>,

    //the completed goal
    #[account(mut)]
    pub goal: Box<Account<'info, Goal>>,
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
        mut,
        seeds = [b"vault",goal.key().as_ref(), creator.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,
    /// The token account owned by the vault PDA that holds the SPL token balance
    /// We require that the token account authority equals the vault PDA
    #[account(
        mut,
        token::authority = vault, 
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub treasury_token_account: Account<'info, TokenAccount>,

    /// SPL token program
    pub token_program: Program<'info, Token>,
}

pub fn sweep_treasury(ctx: Context<SweepTreasury>) -> Result<()> {
    let goal = &mut ctx.accounts.goal;
    let vault = &mut ctx.accounts.vault;
    let vault_ta = &mut ctx.accounts.vault_token_account;
    let treasury_ta = &mut ctx.accounts.treasury_token_account;
    //Guard checks ---
    require!(
        goal.status == crate::state::GoalStatus::Completed,
        SweepTreasuryError::GoalNotCompleted
    );
    // get the vault balance
    let vault_balance = vault_ta.amount;
    require!(vault_balance >0, SweepTreasuryError::VaultEmpty );

    //transfer lamports to treasury
    let cpi_accounts = Transfer{
        from: vault.to_account_info(),
        to: treasury_ta.to_account_info(),
        authority: ctx.accounts.vault.to_account_info()
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(),cpi_accounts);
    token::transfer(cpi_ctx, vault_balance)?;
    Ok(())
}
