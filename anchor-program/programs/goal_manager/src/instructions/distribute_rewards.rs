#[allow(deprecated)]
#[allow(unexpected_cfgs)]
use anchor_lang::prelude::*;
use crate::state::{ Goal};

#[derive(Accounts)]

pub struct DistributeRewards<'info> {
    #[account(
        mut,
        seeds = [b"goal", goal.creator.as_ref(), goal.title.as_bytes()],
        bump
    )]
    pub goal: Account<'info,Goal>,

    //creator can trigger distribuition
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>

}

pub fn hander(ctx: Context<DistributeRewards>) -> Result<()>{
    let goal = &mut ctx.accounts.goal;
    require!(goal.status == GoalStatus::Completed, GoalError::NotCompleted);
    msg!(
        "Distributing {} lamports worth of rewards for goal: {}",
        goal.total_stake,
        goal.title
    );

    Ok(())

}