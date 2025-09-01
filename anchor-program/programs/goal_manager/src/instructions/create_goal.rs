#![allow(unexpected_cfgs)]
#![allow(deprecated)]
use anchor_lang::prelude::*;
use anchor_lang::system_program::System;
use crate::state::{Goal,GoalStatus,Vault};
use crate::errors::GoalError;

#[derive(Accounts)]
#[instruction(title:Vec<u8>)]
pub struct CreateGoalSession<'info> {
    #[account(
        init,
        payer = creator,
        space = Goal::SIZE, // derived from states.rs
        seeds = [b"goal", creator.key().as_ref(), &title , &Clock::get().unwrap().unix_timestamp.to_le_bytes()], 
        bump
    )]
    pub goal: Box<Account<'info,Goal>>,
    #[account(
        init,
        payer = creator,
        space = Vault::SIZE,
        seeds = [b"vault", creator.key().as_ref(), goal.key().as_ref()],
        bump
    )]
    pub vault: Account<'info,Vault>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>
}

pub fn create_goal_session(
    ctx: Context<CreateGoalSession>,
    title: Vec<u8>,
    description: Vec<u8>,
    rules_url: Vec<u8>,
    start_date: i64,
    end_date: i64,
    status: GoalStatus,
    max_participants:u16,
) -> Result<()> {
    if max_participants == 0 {
        return Err(error!(GoalError::InvaildMinimumParticipants));
    }
    if max_participants > 250 {
        return Err(error!(GoalError::InvaildMaximumParticipants));
    }
    if end_date <= start_date {
        return Err(error!(GoalError::InvalidEndDate));
    }

    let goal = &mut ctx.accounts.goal;
    goal.creator = ctx.accounts.creator.key();
    goal.title = title;
    goal.description = description;
    goal.rules_url = rules_url;
    goal.start_date = start_date;
    goal.end_date = end_date;
    goal.status = status;
    goal.max_participants = max_participants;
    goal.bump = ctx.bumps.goal;
    // Initialize vault header
    let vault = &mut ctx.accounts.vault;
    vault.goal = goal.key();
    vault.bump = ctx.bumps.vault;
    Ok(())
}   