use anchor_lang::prelude::*;

declare_id!("8sgn8F6gPbJ1bdNYZf6FLdQ59DBUA389aEmHw785NQfT");

#[program]
pub mod goal_manager {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
