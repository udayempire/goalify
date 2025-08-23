#![allow(unexpected_cfgs)]
#![allow(deprecated)]
use anchor_lang::prelude::*;

use crate::errors::FinalizeGoalError;
use crate::state::{Goal, GoalStatus, Participant, ProgramConfig, Vault};

#[derive(Accounts)]
pub struct FinalizeGoal<'info> {
    /// Program-level config (treasury, oracle, paused)
    pub config: Account<'info, ProgramConfig>,
    /// The goal we are finalizing
    #[account(mut)]
    pub goal: Account<'info, Goal>,
    #[account(mut)]
    pub participant: Account<'info, Participant>,
    #[account(
        mut,
        seeds= [b"vault", goal.key().as_ref(), creator.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,
    pub creator: Signer<'info>,
}

pub fn finalize_goal(ctx: Context<FinalizeGoal>) -> Result<()> {
    let cfg = &ctx.accounts.config;
    let goal = &mut ctx.accounts.goal;
    let vault = &mut ctx.accounts.vault;

    // Guard rails ---
    require!(!cfg.paused, FinalizeGoalError::Paused);
    require!(
        goal.status == GoalStatus::Ongoing,
        FinalizeGoalError::WrongStatus
    ); // need to look at it again
    let now = Clock::get()?.unix_timestamp;
    require!(now >= goal.end_date, FinalizeGoalError::TooEarlyToFinalize); // need to look at it again

    // Tally winners / losers from remaining_accounts
    // Expect exactly goal.total_joined participant PDAs.
    let mut winners_count: u64 = 0;
    let mut losers_count: u64 = 0;
    for acc_info in ctx.remaining_accounts.iter() {
        let participant: Account<Participant> = Account::try_from(acc_info)?;
        //must belong to this goal
        require_keys_eq!(participant.goal, goal.key(), FinalizeGoalError::WrongGoal);
        // Everyone should be verified (Some(true/false)) before finalize
        require!(
            participant.verified.is_some(),
            FinalizeGoalError::UnverifiedParticipant
        );
        if participant.verified == Some(true) {
            winners_count = winners_count
                .checked_add(1)
                .ok_or(FinalizeGoalError::Overflow)?;
        } else {
            losers_count = losers_count
                .checked_add(1)
                .ok_or(FinalizeGoalError::Overflow)?;
        }
    }
    // Ensure we processed everyone (no pagination variant)
    let total_seen = winners_count
        .checked_add(losers_count)
        .ok_or(FinalizeGoalError::Overflow)?;

    require!(
        total_seen as u16 == goal.current_participants,
        FinalizeGoalError::MissingParticipants
    );
    //Payout math (snapshot only) ---
    // All participants staked the same fixed amount
    // let stake = goal.stake_amount as u64;
    // let winners_total_stake_u64 = (winners_count as u64)
    //     .checked_mul(stake)
    //     .ok_or(FinalizeGoalError::Overflow)?;

    // let losers_pool_u64 = (losers_count as u64)
    //     .checked_add(stake)
    //     .ok_or(FinalizeGoalError::Overflow)?;

    // let treasury_cut_u64 = losers_pool_u64
    //     .checked_mul(30)
    //     .ok_or(FinalizeGoalError::Overflow)?
    //     / 100;

    // let winners_pool_u64 = losers_pool_u64
    //     .checked_sub(treasury_cut_u64)
    //     .ok_or(FinalizeGoalError::Overflow)?;

    // Edge cases (documented behavior):
    // - If winners_count == 0 => winners_pool = 0; treasury gets 100% of losers_pool.
    // - If losers_count  == 0 => treasury_cut = 0; winners only reclaim their stake in claim().

    goal.status = GoalStatus::Completed;
    Ok(())
}
