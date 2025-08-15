
#[allow(deprecated)]
#[allow(unexpected_cfgs)]
use anchor_lang::prelude::*;
use crate::state::{Goal, GoalParticipant, GoalStatus};
use crate::errors::GoalError;

pub fn handler(ctx: Context<JoinGoal>, stake_amount: u64) -> Result<()> {
    let goal = &mut ctx.accounts.goal;
    
    //ensuring goal is open
    require!(
        goal.status == GoalStatus::Pending,
        GoalError::GoalNotOpen
    );

    //Save participant info
    let goal_participant = &mut ctx.accounts.goal_participant;
    goalParticipant.goal = goal.key(); //goal pda pubkey
    goalParticipant.participant = ctx.accounts.participant.key();
    goalParticipant.stake_amount = stake_amount;

    //update total stake
    let new_total = goal.total_stake.checked_add(stake_amount).ok_or(GoalError::StakeOverflow)?;
    goal.total_stake = new_total;
    Ok(())
}

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



