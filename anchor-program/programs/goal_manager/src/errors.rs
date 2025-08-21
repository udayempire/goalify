use anchor_lang::prelude::*;

#[error_code]

pub enum GoalError{
    #[msg("Min participants must be greater than 1.")]
    InvaildMinimumParticipants,
    #[msg("Max participants must be less than 250.")]
    InvaildMaximumParticipants,
    #[msg("End date must be greater than start date.")]
    InvalidEndDate,
}