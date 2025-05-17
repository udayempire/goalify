use anchor_lang::prelude::*;

pub mod user;
pub mod goal;
pub mod participation;

use user::*;
use goal::*;
use participation::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkgme1trdrGFD");

#[program]
pub mod goalifier {
    use super::*;

    // User handlers
    pub fn initialize_user(ctx: Context<InitializeUser>, username: String) -> Result<()> {
        user::initialize_user(ctx, username)
    }

    pub fn update_reputation(ctx: Context<UpdateReputation>, amount: i64) -> Result<()> {
        user::update_reputation(ctx, amount)
    }

    // Goal handlers
    pub fn initialize_goal(
        ctx: Context<InitializeGoal>,
        title: String,
        description: String,
        stake_amount: u64,
        registration_date: i64,
        end_date: i64,
    ) -> Result<()> {
        goal::initialize_goal(ctx, title, description, stake_amount, registration_date, end_date)
    }

    pub fn join_goal(ctx: Context<JoinGoal>) -> Result<()> {
        goal::join_goal(ctx)
    }

    // Participation handlers
    pub fn submit_proof(ctx: Context<SubmitProof>, proof_cid: String) -> Result<()> {
        participation::submit_proof(ctx, proof_cid)
    }

    pub fn validate_proof(ctx: Context<ValidateProof>, approved: bool) -> Result<()> {
        participation::validate_proof(ctx, approved)
    }
}