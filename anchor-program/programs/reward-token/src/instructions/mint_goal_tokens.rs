use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token};
use crate::state::RewardMint;
use crate::errors::RewardError;

#[derive(Accounts)]
pub struct MintGoalTokens<'info> {
    #[account(mut)]
    pub reward_mint: Account<'info, RewardMint>,

    #[account(mut)]
    pub mint: Account<'info, Mint>,

    //Token Program
    pub token_program: Program<'info, Token>,

    //pda authority controlling the mint
    /// CHECK: only used as signer PDA
    pub mint_authority: UncheckedAccount<'info>,
}

pub fn handler(ctx: Context<MintGoalTokens>, amount: u64)-> Result<()> {
    let seeds = &[b"reward_mint",ctx.accounts.reward_mint.goal.as_ref(), &[ctx.bumps["mint_authority"]]];
    let signer_seeds = &[&seeds[..]];
    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        MintTo{
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.reward_mint.to_account_info(), // treasury or distribution acct
            authority: ctx.accounts.mint_authority.to_account_info(),
        },
        signer_seeds
    );
    token::mint_to(cpi_ctx, amount)?;
    let reward_mint = &mut ctx.accounts.reward_mint;
    reward_mint.total_supply = reward_mint.total_supply.checked_add(amount)
        .ok_or(RewardError::Overflow)?;

    Ok(())
}
