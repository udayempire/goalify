#[allow(unexpected_cfgs)]
#[allow(deprecated)]
use anchor_lang::prelude::*;


pub mod instructions;
pub mod state;
pub mod errors;

use instructions::*;

declare_id!("8iT2i4bqebs8BKq7Rc9rmWxBMquzmEwTrv1Nx3pU61Q7");

#[program]
pub mod stake_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
    pub fn stake_tokens(
        ctx: Context<StakeTokens>,
        amount: u64 ) 
        -> Result<()>{
            stake_tokens::handler(ctx, amount)
    }

}

#[derive(Accounts)]
pub struct Initialize {}
