// use anchor_lang::prelude::*;
// use crate::state::{Goal, Participant, GoalStatus, ParticipantStatus};
// use crate::errors::GoalError;

// #[derive(Accounts)]
// pub struct ForfeitAndRedistribute<'info> {
//     /// The admin/authority of the goal (not the participant!)
//     #[account(mut)]
//     pub authority: Signer<'info>,

//     /// The Goal account holding participants
//     #[account(
//         mut,
//         has_one = authority @ GoalError::Unauthorized,
//         constraint = goal.status == GoalStatus::Active @ GoalError::GoalNotActive,
//     )]
//     pub goal: Account<'info, Goal>,
// }

// pub fn handler(ctx: Context<ForfeitAndRedistribute>, forfeited_participant: Pubkey) -> Result<()> {
//     let goal = &mut ctx.accounts.goal;

//     // Find participant index
//     let forfeiter = goal.participants
//         .iter_mut()
//         .find(|p| p.key == forfeited_participant)
//         .ok_or(GoalError::ParticipantNotFound)?;

//     // Ensure not already forfeited or claimed
//     require!(
//         forfeiter.status == ParticipantStatus::Joined,
//         GoalError::AlreadyForfeitedOrClaimed
//     );

//     let forfeited_amount = forfeiter.locked_amount;
//     require!(forfeited_amount > 0, GoalError::NothingToForfeit);

//     // Mark as forfeited
//     forfeiter.status = ParticipantStatus::Forfeited;
//     forfeiter.locked_amount = 0;

//     // Count remaining active participants
//     let active_count = goal.participants.iter()
//         .filter(|p| p.status == ParticipantStatus::Joined)
//         .count();

//     require!(active_count > 0, GoalError::NoActiveParticipants);

//     // Redistribute forfeited tokens equally
//     let share = forfeited_amount / active_count as u64;
//     for participant in goal.participants.iter_mut() {
//         if participant.status == ParticipantStatus::Joined {
//             participant.locked_amount = participant
//                 .locked_amount
//                 .checked_add(share)
//                 .ok_or(GoalError::MathOverflow)?;
//         }
//     }

//     Ok(())
// }
