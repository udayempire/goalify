use anchor_lang::prelude::*;

declare_id!("8iT2i4bqebs8BKq7Rc9rmWxBMquzmEwTrv1Nx3pU61Q7");

#[program]
pub mod stake_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
