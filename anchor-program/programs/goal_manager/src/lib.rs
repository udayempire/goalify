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
    pub fn create_goal_session(
        ctx:Context<CreateGoalSession>,
        title: String,
        description: String,
        rules_url: String,
        start_date: i64,
        end_date: i64,
        status: state::GoalStatus,
        max_participants:u16,
    )-> Result<()>{
        instructions::create_goal_session(ctx,title, description,rules_url,start_date,end_date,status,max_participants)
    }
    pub fn join_goal(
        ctx: Context<JoinGoal>,
        proof_uri: Option<String>,
        proof_submitted_at: Option<i64>,
    )->Result<()>{
        instructions::join_goal(ctx, proof_uri, proof_submitted_at)
    }
    pub fn submit_proof(
        ctx:Context<SubmitProof>,
        proof_uri: Option<String>,
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