use anchor_lang::prelude::*;

declare_id!("Bqp8qbntEFEK37Hou9MMsoWgPGzP99AS1NDq4EUjtxTs");

#[program]
pub mod anchor_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
