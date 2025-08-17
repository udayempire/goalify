use anchor_lang::prelude::*;
use crate::state::{Goal, GoalStatus};
use crate::errors::GoalError;

#[derive(Accounts)]
pub struct DistributeRewards<'info> {
    #[account(
        mut,
        seeds = [b"goal", goal.creator.as_ref(), goal.title.as_bytes()],
        bump
    )]
    pub goal: Account<'info, Goal>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<DistributeRewards>) -> Result<()> {
    let goal = &mut ctx.accounts.goal;

    // Ensuring goal is completed
    require!(
        goal.status == GoalStatus::Completed,
        GoalError::NotCompleted
    );

    // ✅ Ensure only creator (or DAO later) can trigger distribution
    require_keys_eq!(ctx.accounts.authority.key(), goal.creator, GoalError::Unauthorized);

    // TODO Fetch participants for this goal (GoalParticipant PDAs)
    // TODO CPI into StakeVault to redistribute tokens
    // TODO CPI into RewardToken to mint GoalTokens to winners

    msg!(
        "Distributing {} lamports worth of rewards for goal: {}",
        goal.total_stake,
        goal.title
    );

    Ok(())
}
