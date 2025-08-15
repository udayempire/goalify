#[allow(deprecated)]
#[allow(unexpected_cfgs)]
use anchor_lang::prelude::*;
use crate::state::{Goal, GoalStatus};

#[derive(Accounts)]
#[instruction(title:String,description:String,deadline:i64,rules_uri:String)]
pub struct CreateGoalSession<'info>{
    #[account(
        init,
        payer = creator,
        space = Goal::SIZE,
        seeds = [b"goal",creator.key().as_ref(),title.as_bytes()],
        bump
    )]
    pub goal: Account<'info,Goal>,
    // to be created later as vault PDA
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info,System>
}

pub fn handler(
    ctx: Context<CreateGoalSession>,
    title: String,
    description: String,
    deadline: i64,
    rules_uri: String,
) -> Result<()>{
    let goal = &mut ctx.accounts.goal;
    goal.creator = ctx.accounts.creator.key();
    goal.title = title;
    goal.description = description;
    goal.stake_vault = ctx.accounts.stake_vault.key();
    goal.status = GoalStatus::Pending;
    goal.rules_uri = rules_uri;
    goal.total_stake = 0;

    OK(())
}
