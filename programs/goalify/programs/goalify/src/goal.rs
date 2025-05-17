use anchor_lang::prelude::*;

#[account]
pub struct Goal {
    pub id: u64,
    pub owner: Pubkey,
    pub title: String,
    pub description: String,
    pub deadline: i64,
    pub is_completed: bool,
    pub reputation_reward: u64,
}

impl Goal {
    pub const LEN: usize = 8 + 32 + (4 + 100) + (4 + 500) + 8 + 1 + 8; // Adjust string sizes as needed
}

#[derive(Accounts)]
pub struct CreateGoal<'info> {
    #[account(init, payer = user, space = 8 + Goal::LEN)]
    pub goal: Account<'info, Goal>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn create_goal(ctx: Context<CreateGoal>, title: String, description: String, deadline: i64, reward: u64) -> Result<()> {
    let goal = &mut ctx.accounts.goal;
    goal.id = Clock::get()?.unix_timestamp as u64;
    goal.owner = ctx.accounts.user.key();
    goal.title = title;
    goal.description = description;
    goal.deadline = deadline;
    goal.is_completed = false;
    goal.reputation_reward = reward;
    Ok(())
}
