use anchor_lang::prelude::*;

// Instruction handlers
pub fn initialize_user(ctx: Context<InitializeUser>, username: String) -> Result<()> {
    let user = &mut ctx.accounts.user;
    let clock = Clock::get()?;
    require!(username.len() <= 32, UserError::UsernameTooLong);

    user.wallet_address = *ctx.accounts.authority.key;
    user.username = username;
    user.reputation = 0;
    user.created_at = clock.unix_timestamp;
    user.updated_at = clock.unix_timestamp;
    Ok(())
}

pub fn update_reputation(ctx: Context<UpdateReputation>, amount: i64) -> Result<()> {
    let user = &mut ctx.accounts.user;
    user.reputation = user.reputation.checked_add(amount).ok_or(UserError::Overflow)?;
    user.updated_at = Clock::get()?.unix_timestamp;
    Ok(())
}

// Account structs & context
#[derive(Accounts)]
#[instruction(username: String)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 4 + 32 + 8 + 8, // discriminator + Pubkey + String prefix + max 32 bytes + 2 timestamps
        seeds = [b"user", authority.key().as_ref()],
        bump
    )]
    pub user: Account<'info, UserAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateReputation<'info> {
    #[account(
        mut,
        seeds = [b"user", user.wallet_address.as_ref()],
        bump
    )]
    pub user: Account<'info, UserAccount>,
    pub authority: Signer<'info>,
}

// PDA account
#[account]
pub struct UserAccount {
    pub wallet_address: Pubkey,
    pub username: String,
    pub reputation: i64,
    pub created_at: i64,
    pub updated_at: i64,
}

// Errors
#[error_code]
pub enum UserError {
    #[msg("The username provided is too long")]
    UsernameTooLong,
    #[msg("Reputation overflow")]
    Overflow,
}
