#![allow(unexpected_cfgs)]
#![allow(deprecated)]
use crate::errors::ClaimError;
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

use crate::state::Goal;
use crate::state::Participant;
use crate::state::Vault;

#[derive(Accounts)]

pub struct Claim<'info> {
    /// The goal this participant belongs to
    #[account(mut)]
    pub goal: Box<Account<'info, Goal>>,
    /// The participant claiming rewards
    #[account(mut, has_one = user)]
    pub participant: Box<Account<'info, Participant>>,
    // Vault holding all stakes for this goal
    #[account(
        mut,
        seeds=[b"vault", goal.key().as_ref(), goal.creator.as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,
    //the signer claiming the rewards
    #[account(mut)]
    pub user: Signer<'info>,
    /// The participant's associated token account for this SPL token
    #[account(mut)]
    pub participant_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

pub fn claim(
    ctx: Context<Claim>,
    total_winners: u64, // passed from off-chain calculation
    losers_stake: u64, // passed from off-chain calculation
) -> Result<()> {
    let goal = &mut ctx.accounts.goal;
    let participant = &mut ctx.accounts.participant;

    // Only completed goals
    require!(
        goal.status == crate::state::GoalStatus::Completed,
        ClaimError::GoalNotCompleted
    );

    //compute payout per winner
    let losing_stake = losers_stake;

    //70 percent of losin stake to winners
    let bonus_pool = losing_stake * 70/100;
    //count winners
    let total_winners= total_winners as u64;
    let bonus_per_winner = if total_winners > 0 {
        bonus_pool/ total_winners
    }else{
        0
    };
    // total payout = original stake+ bonus
    let payout = goal.stake_amount  + bonus_per_winner;
    //Transfer payout from vault to participant
    let cpi_accounts =  Transfer{
        from: ctx.accounts.vault.to_account_info(),
        to: ctx.accounts.participant_ata.to_account_info(),
        authority: ctx.accounts.vault.to_account_info()
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(),cpi_accounts);
    token::transfer(cpi_ctx,payout)?;
    // mark participant as claimed
    participant.claimed = Some(true);

    Ok(())
}
