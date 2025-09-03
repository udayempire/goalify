#![allow(unexpected_cfgs)]
#![allow(deprecated)]
use anchor_lang::prelude::*;
use crate::instructions::*;

pub mod instructions;
pub mod state;
pub mod errors;

declare_id!("8sgn8F6gPbJ1bdNYZf6FLdQ59DBUA389aEmHw785NQfT");

#[program]
pub mod goal_manager {
    use super::*;

    pub fn initalize_platform(
        ctx:Context<InitializePlatform>
    )->Result<()>{
        instructions::initalize_platform(ctx)
    }
    pub fn create_goal_session(
        ctx:Context<CreateGoalSession>,
        title: Vec<u8>,
        description: Vec<u8>,
        rules_url: Vec<u8>,
        start_date: i64,
        end_date: i64,
        max_participants:u16,
        stake_amount: u64,
    )-> Result<()>{
        instructions::create_goal_session(ctx,title, description,rules_url,start_date,end_date,max_participants,stake_amount)
    }
    pub fn join_goal(
        ctx: Context<JoinGoal>,
        proof_uri: Option<Vec<u8>>,
        proof_submitted_at: Option<i64>,
    )->Result<()>{
        instructions::join_goal(ctx, proof_uri, proof_submitted_at)
    }
    pub fn submit_proof(
        ctx:Context<SubmitProof>,
        proof_uri: Option<Vec<u8>>,
    )->Result<()>{
        instructions::submit_proof(ctx, proof_uri)
    }
    pub fn verify_participant(
        ctx:Context<VerifyParticipant>,
        is_verified: bool
    )->Result<()>{
        instructions::verify_participant(ctx, is_verified)  
    }
    pub fn claim(
        ctx: Context<Claim>,
        total_winners: u64, 
        losers_stake: u64,
    )->Result<()>{
        instructions::claim(ctx, total_winners, losers_stake)
    }
    pub fn sweep_treasury(ctx:Context<SweepTreasury>)->Result<()>{
        instructions::sweep_treasury(ctx)
    }
}