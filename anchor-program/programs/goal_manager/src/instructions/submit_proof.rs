#![allow(unexpected_cfgs)]
#![allow(deprecated)]
use anchor_lang::prelude::*;

use crate::state::{Goal, GoalStatus, Participant};
use crate::errors::SubmitProofError;

#[derive(Accounts)]
pub struct SubmitProof<'info>{
    #[account(mut)]
    pub goal: Box<Account<'info,Goal>>,
    #[account(
        mut,
        seeds = [b"participant", goal.key().as_ref(), user.key().as_ref()],
        bump,
        has_one = goal
    )]
    pub participant: Box<Account<'info,Participant>>,
    pub user: Signer<'info>,
}

pub fn submit_proof(
    ctx:Context<SubmitProof>,
    proof_uri: Option<Vec<u8>>,
)->Result<()>{
    let goal =&mut ctx.accounts.goal;
    let participant = &mut ctx.accounts.participant;
    //1. goal must be ongoing
    require!(
        goal.status == GoalStatus::Ongoing,
        SubmitProofError::GoalNotOngoing
    );
    //2. ensuring only the participant themselves can submit proof
    require!(
        participant.user == ctx.accounts.user.key(),
        SubmitProofError::UnauthorizedSubmit
    );
    //3. storing the proof
    participant.proof_uri = proof_uri;
    participant.proof_submitted_at = Some(Clock::get()?.unix_timestamp);
    Ok(())
}