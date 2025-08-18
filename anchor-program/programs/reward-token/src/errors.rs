use anchor_lang::prelude::*;

#[error_code]
pub enum RewardError {
    #[msg("Math overflow")]
    Overflow,
    #[msg("Unauthorized action")]
    Unauthorized,
    #[msg("Invalid distribution")]
    InvalidDistribution,
}