use anchor_lang::prelude::*;
use crate::state::{Goal, GoalParticipant, GoalStatus};
use crate::errors::GoalError;

#[derive(Accounts)]
pub struct JoinGoal<'info>{
    #[account(
        mut,
        seeds = [b"goal",creator.key().as_ref(),title.as_bytes()],
        bump
    )]
    pub goal: Account<'info, Goal>,
    #[account(
        init,
        payer = participant,
        space = GoalParticipant::SIZE,
        seeds = [b"participants", goal.key().as_ref(), particpant.key().as_ref()],
        bump
    )]
    pub goal_participant: Account<'info, GoalParticipant>,
    #[account(mut)]
    pub participant: Signer<'info>,
    pub system_program: Program<'info,System>

}


