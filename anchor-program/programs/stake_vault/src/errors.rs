use anchor_lang::prelude::*;

#[error_code]
pub enum StakeVaultError{
    #[msg("User has insufficient balance.")]
    InsufficientBalance,
    #[msg("Token mint not whitelisted.")]
    MintNotWhitelisted,
    #[msg("Overflow occurred.")]
    Overflow,
    #[msg("Unauthorized action.")]
    Unauthorized,
}