#[allow(unexpected_cfgs)]
#[allow(deprecated)]
use anchor_lang::prelude::*;
use crate::state::{Goal,GoalStatus};

#[derive(Accounts)]
pub struct CreateGoalSession<'info> {
    #[account(
        init,
        payer = creator,
        space = Goal::SIZE, // derived from states.rs
        seeds = [b"goal", creator.key().as_ref(), title.as_bytes()], 
        bump
    )]
    pub goal: Account<'info,Goal>,
    #[account(mut)]
    pub creator: Signer<'info>,
}

