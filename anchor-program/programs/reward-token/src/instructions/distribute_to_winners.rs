use crate::state::RewardMint;
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
// use crate::errors::RewardError;

#[derive(Accounts)]

pub struct DistributeToWinners<'info> {
    #[account(mut)]
    pub reward_mint: Account<'info, RewardMint>,
    #[account(mut)]
    pub from_token_account: Account<'info, TokenAccount>, // Treasury pool
    #[account(mut)]
    pub to_token_account: Account<'info, TokenAccount>, // recipient
    pub token_program: Program<'info, Token>,

    /// CHECK: PDA authority
    pub mint_authority: UncheckedAccount<'info>,
}

pub fn handler(ctx: Context<DistributeToWinners>) -> Result<()> {
    let seeds = &[b"reward-mint", ctx.accounts.reward_mint.goal.as_ref(), &[ctx.bumps["mint_authority"]]];
    let signer_seeds = &[&seeds[..]];

    let amount_per_winner = ctx.accounts.reward_mint.total_supply / 10; // example split: 10 winners

    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.from_token_account.to_account_info(),
            to: ctx.accounts.winner_token_account.to_account_info(),
            authority: ctx.accounts.mint_authority.to_account_info(),
        },
        signer_seeds,
    );

    token::transfer(cpi_ctx, amount_per_winner)?;

    Ok(())
}
