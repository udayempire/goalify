use anchor_lang::prelude::*;
use crate::state::{Goal, GoalParticipant, GoalStatus};
use crate::errors::GoalError;

pub fn handler(ctx: Context<JoinGoal>, stake_amount: u64) -> Result<()> {
    let goal = &mut ctx.accounts.goal;

    // ✅ Ensure goal is open
    require!(
        goal.status == GoalStatus::Pending,
        GoalError::GoalNotOpen
    );

    // ✅ Save participant info
    let goal_participant = &mut ctx.accounts.goal_participant;
    goal_participant.goal = goal.key(); 
    goal_participant.participant = ctx.accounts.participant.key();
    goal_participant.stake_amount = stake_amount;

    // ✅ Update total stake
    let new_total = goal
        .total_stake
        .checked_add(stake_amount)
        .ok_or(GoalError::StakeOverflow)?;
    goal.total_stake = new_total;

    // 🔮 TODO: CPI into StakeVault to actually move tokens/lamports

    Ok(())
}

#[derive(Accounts)]
pub struct JoinGoal<'info> {
    #[account(
        mut,
        seeds = [b"goal", goal.creator.as_ref(), goal.title.as_bytes()],
        bump
    )]
    pub goal: Account<'info, Goal>,

    #[account(
        init,
        payer = participant,
        space = GoalParticipant::SIZE,
        seeds = [b"participant", goal.key().as_ref(), participant.key().as_ref()],
        bump
    )]
    pub goal_participant: Account<'info, GoalParticipant>,

    #[account(mut)]
    pub participant: Signer<'info>,

    pub system_program: Program<'info, System>,
}
