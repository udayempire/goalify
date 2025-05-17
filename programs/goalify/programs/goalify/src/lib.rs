use anchor_lang::prelude::*;

pub mod user;
use user::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkgme1trdrGFD");

#[program]
pub mod goalifier {
    use super::*;

    // Re-export your user handlers
    pub fn initialize_user(ctx: Context<InitializeUser>, username: String) -> Result<()> {
        user::initialize_user(ctx, username)
    }

    pub fn update_reputation(ctx: Context<UpdateReputation>, amount: i64) -> Result<()> {
        user::update_reputation(ctx, amount)
    }

    // Later you can call goal::initialize_goal, etc.
}
