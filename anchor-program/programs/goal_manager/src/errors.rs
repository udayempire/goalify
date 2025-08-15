use anchor_lang::prelude::*;

#[error_code]

pub enum GoalError{
    #[msg("Goal is not open for joining.")]
    GoalNotOpen,
    #[msg("Stake amount overflow.")]
    StakeOverflow,
}