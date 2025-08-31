#![allow(unexpected_cfgs)]
#![allow(deprecated)]
use crate::errors::VerifyParticipantError;
use crate::state::{Goal, Participant};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct VerifyParticipant<'info> {
    pub goal: Account<'info, Goal>,
    #[account(
        mut,
        has_one= goal
    )]
    pub participant: Account<'info, Participant>,
    #[account(signer)]
    pub verifier: Signer<'info>,
}

pub fn verify_participant(ctx: Context<VerifyParticipant>,is_verified: bool) -> Result<()> {
    let goal = &mut ctx.accounts.goal;
    let participant = &mut ctx.accounts.participant;
    //ensuring only goal creator can run this
    require!(
        goal.creator == ctx.accounts.verifier.key(),
        VerifyParticipantError::UnauthorizedAuthority
    );
    // validate proof before verification
    require!(
        participant.proof_uri.is_some(),
        VerifyParticipantError::ProofNotSubmitted
    );
    // Prevent re-verification if you want
    require!(participant.verified.is_none(), 
    VerifyParticipantError::AlreadyVerified
    );
    // set verified status
    participant.verified =Some(is_verified);
    Ok(())
}
