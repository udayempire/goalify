#![allow(unexpected_cfgs)]
#![allow(deprecated)]
use anchor_lang::prelude::*;

use crate::errors::FinalizeGoalError;
use crate::state::{Goal, GoalStatus, Participant, ProgramConfig, Vault};

#[derive(Accounts)]
pub struct FinalizeGoal<'info> {
    /// Program-level config (treasury, oracle, paused)
    pub config: Account<'info, ProgramConfig>,
    /// The goal we are finalizing
    #[account(mut)]
    pub goal: Box<Account<'info, Goal>>,
    #[account(mut)]
    pub participant: Box<Account<'info, Participant>>,
    #[account(
        mut,
        seeds= [b"vault", goal.key().as_ref(), creator.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,
    pub creator: Signer<'info>,
}

pub fn finalize_goal(ctx: Context<FinalizeGoal>) -> Result<()> {
    let cfg = &ctx.accounts.config;
    let goal = &mut ctx.accounts.goal;

    // Guard rails ---
    require!(!cfg.paused, FinalizeGoalError::Paused);
    require!(
        goal.status == GoalStatus::Ongoing,
        FinalizeGoalError::WrongStatus
    );
    let now = Clock::get()?.unix_timestamp;
    require!(now >= goal.end_date, FinalizeGoalError::TooEarlyToFinalize);

    // Close the goal - no more submissions allowed
    goal.status = GoalStatus::Completed;
    
    Ok(())
}
