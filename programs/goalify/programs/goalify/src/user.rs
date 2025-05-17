use anchor_lang::prelude::*;

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

#[derive(Accounts)]
#[instruction(username: String)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 4 + 32 + 8 + 8,
        seeds = [b"user", authority.key().as_ref()],
        bump
    )]
    pub user: Account<'info, UserAccount>,
    #[account(mut)] pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateReputation<'info> {
    #[account(mut, seeds = [b"user", user.wallet_address.as_ref()], bump)]
    pub user: Account<'info, UserAccount>,
    pub authority: Signer<'info>,
}

#[account]
pub struct UserAccount {
    pub wallet_address: Pubkey,
    pub username: String,
    pub reputation: i64,
    pub created_at: i64,
    pub updated_at: i64,
}

#[error_code]
pub enum UserError {
    #[msg("The username provided is too long")] UsernameTooLong,
    #[msg("Reputation overflow")] Overflow,
}

// File: programs/goalifier/src/goal.rs
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer};

pub fn initialize_goal(
    ctx: Context<InitializeGoal>,
    title: String,
    description: String,
    stake_amount: u64,
    registration_date: i64,
    end_date: i64,
) -> Result<()> {
    let goal = &mut ctx.accounts.goal;
    goal.creator = *ctx.accounts.creator.key;
    goal.title = title;
    goal.description = description;
    goal.stake_amount = stake_amount;
    goal.registration_date = registration_date;
    goal.end_date = end_date;
    goal.status = GoalStatus::ToBeStarted;
    goal.participants = vec![*ctx.accounts.creator.key];
    Ok(())
}

pub fn join_goal(ctx: Context<JoinGoal>) -> Result<()> {
    let goal = &mut ctx.accounts.goal;
    let participant = ctx.accounts.participant.key();
    require!(!goal.participants.contains(&participant), GoalError::AlreadyJoined);

    let cpi_accounts = Transfer {
        from: ctx.accounts.from_token_account.to_account_info(),
        to: ctx.accounts.escrow_token_account.to_account_info(),
        authority: ctx.accounts.participant.to_account_info(),
    };
    token::transfer(CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts), goal.stake_amount)?;
    goal.participants.push(participant);
    Ok(())
}

#[derive(Accounts)]
pub struct InitializeGoal<'info> {
    #[account(init, payer = creator, space = 8 + /* calculate size */, seeds = [b"goal", creator.key().as_ref()], bump)]
    pub goal: Account<'info, GoalAccount>,
    #[account(mut)] pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct JoinGoal<'info> {
    #[account(mut, seeds = [b"goal", goal.creator.as_ref()], bump)]
    pub goal: Account<'info, GoalAccount>,
    #[account(mut)] pub participant: Signer<'info>,
    #[account(mut)] pub from_token_account: Account<'info, TokenAccount>,
    #[account(mut, seeds = [b"escrow", goal.key().as_ref()], bump)] pub escrow_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct GoalAccount {
    pub creator: Pubkey,
    pub title: String,
    pub description: String,
    pub stake_amount: u64,
    pub registration_date: i64,
    pub end_date: i64,
    pub status: GoalStatus,
    pub participants: Vec<Pubkey>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum GoalStatus {
    ToBeStarted,
    Active,
    Completed,
    Cancelled,
}

#[error_code]
pub enum GoalError {
    #[msg("User already joined this goal")]
    AlreadyJoined,
}

// File: programs/goalifier/src/participation.rs
use anchor_lang::prelude::*;

pub fn submit_proof(ctx: Context<SubmitProof>, proof_cid: String) -> Result<()> {
    let participation = &mut ctx.accounts.participation;
    participation.proof_cid = proof_cid;
    participation.status = ParticipationStatus::ProofSubmitted;
    Ok(())
}

pub fn validate_proof(ctx: Context<ValidateProof>, approved: bool) -> Result<()> {
    let participation = &mut ctx.accounts.participation;
    participation.status = if approved { ParticipationStatus::Completed } else { ParticipationStatus::Failed };
    Ok(())
}

#[derive(Accounts)]
pub struct SubmitProof<'info> {
    #[account(init, payer = user, space = 8 + /* size */, seeds = [b"participation", user.key().as_ref(), goal.key().as_ref()], bump)]
    pub participation: Account<'info, ParticipationAccount>,
    #[account(mut)] pub user: Signer<'info>,
    #[account(mut)] pub goal: Account<'info, GoalAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ValidateProof<'info> {
    #[account(mut, seeds = [b"participation", participation.user.as_ref(), participation.goal.as_ref()], bump)]
    pub participation: Account<'info, ParticipationAccount>,
    pub validator: Signer<'info>,
}

#[account]
pub struct ParticipationAccount {
    pub user: Pubkey,
    pub goal: Pubkey,
    pub proof_cid: String,
    pub status: ParticipationStatus,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ParticipationStatus {
    ProofSubmitted,
    Completed,
    Failed,
}
