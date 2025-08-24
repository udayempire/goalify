#![allow(unexpected_cfgs)]
#![allow(deprecated)]
use anchor_lang::prelude::*;

use crate::state::ProgramConfig;

#[derive(Accounts)]
pub struct InitializePlatform<'info>{
    #[account(
        init,
        payer = admin,
        seeds=[b"config", admin.key().as_ref()],
        space= ProgramConfig::SIZE,
        bump,
    )]
    pub config: Account<'info,ProgramConfig>,

    #[account(mut)]
    pub admin: Signer<'info>, // The person deploying/initializing the platform

     /// Treasury is just a system account or token account that will hold fees
     /// to be passed in during initialization
     pub treasury: SystemAccount<'info>,
     /// CHECK: This is just a pubkey (oracle’s authority, no validation needed now)
     pub oracle_signer: UncheckedAccount<'info>,
     pub system_program: Program<'info,System>
}

pub fn initalize_platform(
    ctx:Context<InitializePlatform>,
)-> Result<()>{
    let program_config= &mut ctx.accounts.config;
    program_config.admin = ctx.accounts.admin.key();
    program_config.treasury = ctx.accounts.treasury.key();
    program_config.oracle_signer = ctx.accounts.oracle_signer.key();
    program_config.paused = false; // default = running
    program_config.bump = ctx.bumps.config;
    Ok(())
}
