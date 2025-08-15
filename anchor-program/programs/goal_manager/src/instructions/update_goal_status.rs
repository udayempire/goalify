#[allow(deprecated)]
#[allow(unexpected_cfgs)]
use anchor_lang::prelude::*;
use crate::state::{Goal, GoalStatus};
use crate::errors::GoalError;

#[derive(Accounts)]
pub struct UpdateGoalStatus<'info> {
    #[account(
        mut,
        seeds = [b"goal", goal.creator.as_ref(), goal.title.as_bytes()],
        bump
    )]
    pub goal: Account<'info,Goal>,

    pub authority: Signer<'info>,  //The one allowed to update (goal creator or verification program)
    pub system_program: Program<'info,System>
}

pub fn handler(ctx: Context<UpdateGoalStatus>, new_status: GoalStatus) -> Result<()>{
    let goal = &mut ctx.accounts.goal;
    // Only creator can update (replace this with verification program PDA in future)
    require!(
        ctx.accounts.authority.key() == goal.creator,
        GoalError::UnauthorizedStatusChange
    );
    //Only allow status change if pending
    require!(goal.status == GoalStatus::Pending, GoalError::InvalidStatusUpdate);
    goal.status = new_status;

    Ok(())
}



