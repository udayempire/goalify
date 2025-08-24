#![allow(unexpected_cfgs)]
#![allow(deprecated)]
use crate::{errors::{JoinGoalError}, state::{Goal,GoalStatus, Participant, Vault}};
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

#[derive(Accounts)]
pub struct JoinGoal<'info> {
    #[account(mut)]
    pub goal: Account<'info, Goal>,
    #[account(mut, has_one = goal @ JoinGoalError::InvalidVault)]
    pub vault: Account<'info, Vault>,
    #[account(
        init,
        payer = user,
        space = Participant::SIZE,
        seeds = [b"participant", user.key().as_ref(),goal.key().as_ref() ],
        bump
    )]
    pub participant: Account<'info, Participant>,
    //spl token account
    //user-mint
    #[account(
        mut,
        constraint = user_token_account.owner == user.key() @ JoinGoalError::InvalidUserTokenOwner,
        constraint = user_token_account.mint == goal.stake_mint @ JoinGoalError::WrongMintAccount
    )]
    pub user_token_account: Account<'info, TokenAccount>,
    /// Goal vault token account (ATA for the vault authority PDA over the same mint)
    #[account(mut, constraint = vault_token_account.mint == goal.stake_mint)]
    pub vault_token_account: Account<'info, TokenAccount>,

    /// Mint used for staking (e.g., USDC)
    pub stake_mint: Account<'info, Mint>,
    #[account(mut)]
    pub user: Signer<'info>,
    /// token program
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn join_goal(
    ctx: Context<JoinGoal>,
    proof_uri: Option<String>,
    proof_submitted_at: Option<i64>,
) -> Result<()> {
    let goal = &mut ctx.accounts.goal;
    let now = Clock::get()?.unix_timestamp;
    // Only allow joining before start_date for v1
    require!(now < goal.start_date, JoinGoalError::JoinWindowClosed);
    // Goal must be in scheduled state (not already started/closed)
    require!(
        goal.status == GoalStatus::Scheduled,
        JoinGoalError::GoalNotJoinable
    );
    // Participant limit 
    if goal.max_participants > 0 {
        require!(
            (goal.current_participants as u32) < (goal.max_participants as u32),
            JoinGoalError::ParticipantLimitReached
        );
    }
    //mint and token account checks
    //ensuring provided mint matches goal.stake_mint
    require_keys_eq!(ctx.accounts.stake_mint.key(), goal.stake_mint, JoinGoalError::WrongMintAccount);

    // user_token_account and vault_token_account are constrained in accounts above
    // Ensuring vault_token_account's authority is the vault PDA authority.
    // derive expected vault authority PDA: seeds used at create_goal
    let (expected_vault, _bump)=
    Pubkey::find_program_address(&[b"vault",goal.key().as_ref(),goal.creator.as_ref()], ctx.program_id);
    require_keys_eq!(
        ctx.accounts.vault_token_account.owner,
        expected_vault,
        JoinGoalError::InvalidVaultOwner
    );

    //transfer user token to vault
    // Use CPI to token::transfer where authority is the user signer
    let cpi_accounts = Transfer{
        from: ctx.accounts.user_token_account.to_account_info(),
        to: ctx.accounts.vault_token_account.to_account_info(),
        authority: ctx.accounts.user.to_account_info()
    };
    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        cpi_accounts
    );
    token::transfer(cpi_ctx, goal.stake_amount)?;

    //update goal counters
    goal.current_participants += 1;

    //Initializing participant record
    let participant = &mut ctx.accounts.participant;
    participant.goal = goal.key();
    participant.user = ctx.accounts.user.key();
    participant.proof_uri = proof_uri;
    participant.proof_submitted_at = proof_submitted_at;
    participant.verified = Some(false);
    participant.claimed = Some(false);
    participant.joined_at = Clock::get()?.unix_timestamp;

    Ok(())
}
