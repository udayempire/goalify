use anchor_lang::prelude::*;

#[error_code]

pub enum GoalError {
    #[msg("Min participants must be greater than 1.")]
    InvaildMinimumParticipants,
    #[msg("Max participants must be less than 250.")]
    InvaildMaximumParticipants,
    #[msg("End date must be greater than start date.")]
    InvalidEndDate,
}
#[error_code]
pub enum JoinGoalError {
    #[msg("Vault must have a associcated goal.")]
    InvalidVault,
    #[msg("The provided token account is not owned by the user.")]
    InvalidUserTokenOwner,
    #[msg("The token account mint does not match the required stake mint.")]
    WrongMintAccount,
    /// Joining is only allowed before the goal's start date
    #[msg("Join window is closed. Participants can only join before the goal's start date.")]
    JoinWindowClosed,
    /// Goal is not in a joinable state (must be Scheduled, not Started or Closed)
    #[msg("Goal is not joinable. It must be in the 'Scheduled' state to accept participants.")]
    GoalNotJoinable,
    /// The maximum participant limit has been reached
    #[msg("Participant limit reached. No more participants can join this goal.")]
    ParticipantLimitReached,
    #[msg("The vault token account is not owned by the expected vault PDA authority.")]
    InvalidVaultOwner,
}

#[error_code]

pub enum SubmitProofError {
    #[msg("Goal must be ongoing")]
    GoalNotOngoing,
    #[msg("Only the participant can submit their own proof.")]
    UnauthorizedSubmit
}
#[error_code]
pub enum VerifyParticipantError{
    #[msg("Only the goal creatoror designated authority can run this instruction only.")]
    UnauthorizedAuthority,
    #[msg("Proof not submitted by participant")]
    ProofNotSubmitted,
    #[msg("Participant was already verified")]
    AlreadyVerified
}
#[error_code]
pub enum FinalizeGoalError{
    #[msg("Goal is currently paused for further operations due to unfortunate reasons")]
    Paused,
    #[msg("Goal must be ongoing in order to stop it")]
    WrongStatus,
    #[msg("Please let the goal over to finalize it")]
    TooEarlyToFinalize,
    #[msg("Participant must be from same goal")]
    WrongGoal,
    #[msg("Arithmetic overflow occurred")]
    Overflow,
    #[msg("Participant is not verified")]
    UnverifiedParticipant,
    #[msg("Participants are missing.")]
    MissingParticipants
}
#[error_code]
pub enum ClaimError {
    #[msg("Rewards cant be distributed before goal is completed")]
    GoalNotCompleted
}