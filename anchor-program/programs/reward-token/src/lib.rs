use anchor_lang::prelude::*;


pub mod instructions;
pub mod state;
pub mod errors;
declare_id!("5i5RFgcDnaQa1gGFy5pW9S8XN9rhuX73NFgowTtwyqD6");

#[program]
pub mod reward_token {
    use super::*;

    pub fn mint_goal_tokens(ctx:Context<MintGoalTokens>, amount: u64) -> Result<()>{
        mint_goal_tokens::handler(ctx, amount)
    }
    //distribute amount to winners after goal success
    pub fn distribute_to_winners(ctx:Context<DistributeToWinners>) -> Result<()>{
        distribute_to_winners(ctx)
    }

}


