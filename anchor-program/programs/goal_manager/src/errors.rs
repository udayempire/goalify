use anchor_lang::prelude::*;

#[error_code]

pub enum GoalError{
    #[msg("Goal is not open for joining.")]
    GoalNotOpen,
    #[msg("Stake amount overflow.")]
    StakeOverflow,
    #[msg("Only the goal creator can update the status.")]
    UnauthorizedStatusChange,
    #[msg("Goal status is not pending.")]
    InvalidStatusUpdate,
    #[msg("Cannot distribute rewards unless goal is completed.")]
    NotCompleted,
}