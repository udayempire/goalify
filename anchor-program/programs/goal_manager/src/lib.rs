#[allow(unexpected_cfgs)]
#[allow(deprecated)]
use anchor_lang::prelude::*;


pub mod instructions;
pub mod state;
pub mod errors;

use instructions::*;
declare_id!("8sgn8F6gPbJ1bdNYZf6FLdQ59DBUA389aEmHw785NQfT");

#[program]
pub mod goal_manager {
    use super::*;

    pub fn create_goal_sessions(
        ctx: Context<CreateGoalSession>,
        title:String,
        description: String,
        deadline: i64,
        rules_url: String
    )-> Result<()>{
        create_goal_sessions::handler(ctx, title, description, deadline, rules_url)
    }

    pub fn join_goal(
        ctx: Context<JoinGoal>, stake_amount: u64
    ) -> Result<()>{
        instruction::join_goal::handler(ctx,params)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
