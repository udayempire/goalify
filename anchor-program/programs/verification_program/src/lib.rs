#[allow(unexpected_cfgs)]
#[allow(deprecated)]
use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod errors;

declare_id!("yQGgkBcMkjYy8rrtgdLRjtjnPvJdS5YJET1MRHCv1CX");


#[program]
pub mod verification_program {
    // use anchor_lang::solana_program::address_lookup_table::instruction;

    use super::*;
    pub fn auto_goal_verify(
        ctx: Context<instruction::VerifyGoal>
    )-> Result<()>{
        instruction::handler(ctx)
    }
}

