use anchor_lang::prelude::*;
use crate::state::{Goal, GoalStatus};
use crate::errors::GoalError;

#[derive(Accounts)]
pub struct VerifyGoal<'info> {
    #[account(mut)]
    pub goal: Account<'info, Goal>,
}

pub fn handler(ctx: Context<VerifyGoal>) -> Result<()> {
    let goal = &mut ctx.accounts.goal;

    // Only pending goals can be verified
    if goal.status != GoalStatus::Pending {
        return Err(GoalError::AlreadyVerified.into());
    }

    let now = Clock::get()?.unix_timestamp;

    // If deadline has passed, mark as Completed or Failed based on proof submission
    if now > goal.deadline {
        if goal.proof_submitted && goal.proof_submission_time <= goal.deadline {
            goal.status = GoalStatus::Completed;
        } else {
            goal.status = GoalStatus::Failed;
        }
    }

    Ok(())
}
