use anchor_lang::prelude::*;

#[account]
pub struct Participation {
    pub participant: Pubkey,
    pub goal: Pubkey,
    pub joined_at: i64,
    pub is_verified: bool,
}

impl Participation {
    pub const LEN: usize = 32 + 32 + 8 + 1;
}

#[derive(Accounts)]
pub struct JoinGoal<'info> {
    #[account(init, payer = user, space = 8 + Participation::LEN)]
    pub participation: Account<'info, Participation>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn join_goal(ctx: Context<JoinGoal>, goal: Pubkey) -> Result<()> {
    let participation = &mut ctx.accounts.participation;
    participation.participant = ctx.accounts.user.key();
    participation.goal = goal;
    participation.joined_at = Clock::get()?.unix_timestamp;
    participation.is_verified = false;
    Ok(())
}
