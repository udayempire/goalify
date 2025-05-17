use anchor_lang::prelude::*;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap, UnorderedSet};
use near_sdk::{env, near_bindgen, AccountId, Balance, Promise, PanicOnDefault};
use near_sdk::serde::{Deserialize, Serialize};
use std::collections::HashMap;

pub fn initialize_user(ctx: Context<InitializeUser>, username: String) -> Result<()> {
    let user = &mut ctx.accounts.user;
    let clock = Clock::get()?;
    require!(username.len() <= 32, UserError::UsernameTooLong);

    user.wallet_address = *ctx.accounts.authority.key;
    user.username = username;
    user.reputation = 0;
    user.created_at = clock.unix_timestamp;
    user.updated_at = clock.unix_timestamp;
    Ok(())
}

pub fn update_reputation(ctx: Context<UpdateReputation>, amount: i64) -> Result<()> {
    let user = &mut ctx.accounts.user;
    user.reputation = user.reputation.checked_add(amount).ok_or(UserError::Overflow)?;
    user.updated_at = Clock::get()?.unix_timestamp;
    Ok(())
}

#[derive(Accounts)]
#[instruction(username: String)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 4 + 32 + 8 + 8,
        seeds = [b"user", authority.key().as_ref()],
        bump
    )]
    pub user: Account<'info, UserAccount>,
    #[account(mut)] pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateReputation<'info> {
    #[account(mut, seeds = [b"user", user.wallet_address.as_ref()], bump)]
    pub user: Account<'info, UserAccount>,
    pub authority: Signer<'info>,
}

#[account]
pub struct UserAccount {
    pub wallet_address: Pubkey,
    pub username: String,
    pub reputation: i64,
    pub created_at: i64,
    pub updated_at: i64,
}

#[error_code]
pub enum UserError {
    #[msg("The username provided is too long")] UsernameTooLong,
    #[msg("Reputation overflow")] Overflow,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(crate = "near_sdk::serde")]
pub enum GoalStatus {
    InProgress,
    Completed,
    Failed,
    Validated,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Goal {
    description: String,
    deadline: u64, // timestamp
    stake_amount: Balance,
    status: GoalStatus,
    validators: Vec<AccountId>,
    validations_received: u32,
    validations_required: u32,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Group {
    name: String,
    members: Vec<AccountId>,
    validators: Vec<AccountId>,
    active_goals: UnorderedMap<AccountId, Goal>,
    completed_goals: UnorderedMap<AccountId, Goal>,
    failed_goals: UnorderedMap<AccountId, Goal>,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct StakingContract {
    groups: UnorderedMap<String, Group>,
    user_stakes: LookupMap<AccountId, Balance>,
    platform_fees: Balance,
}

#[near_bindgen]
impl StakingContract {
    #[init]
    pub fn new() -> Self {
        Self {
            groups: UnorderedMap::new(b"g"),
            user_stakes: LookupMap::new(b"s"),
            platform_fees: 0,
        }
    }

    pub fn create_group(&mut self, group_name: String) {
        assert!(!self.groups.get(&group_name).is_some(), "Group already exists");
        
        let group = Group {
            name: group_name.clone(),
            members: vec![env::predecessor_account_id()],
            validators: vec![],
            active_goals: UnorderedMap::new(format!("ag_{}", group_name).as_bytes()),
            completed_goals: UnorderedMap::new(format!("cg_{}", group_name).as_bytes()),
            failed_goals: UnorderedMap::new(format!("fg_{}", group_name).as_bytes()),
        };
        
        self.groups.insert(&group_name, &group);
    }

    pub fn join_group(&mut self, group_name: String) {
        let mut group = self.groups.get(&group_name).expect("Group not found");
        let account_id = env::predecessor_account_id();
        
        assert!(!group.members.contains(&account_id), "Already a member");
        
        group.members.push(account_id);
        self.groups.insert(&group_name, &group);
    }

    pub fn become_validator(&mut self, group_name: String) {
        let mut group = self.groups.get(&group_name).expect("Group not found");
        let account_id = env::predecessor_account_id();
        
        assert!(group.members.contains(&account_id), "Not a member of this group");
        assert!(!group.validators.contains(&account_id), "Already a validator");
        
        group.validators.push(account_id);
        self.groups.insert(&group_name, &group);
    }

    #[payable]
    pub fn create_goal(&mut self, group_name: String, description: String, deadline: u64, validations_required: u32) {
        let mut group = self.groups.get(&group_name).expect("Group not found");
        let account_id = env::predecessor_account_id();
        let stake_amount = env::attached_deposit();
        
        assert!(group.members.contains(&account_id), "Not a member of this group");
        assert!(stake_amount > 0, "Stake amount must be greater than 0");
        assert!(deadline > env::block_timestamp(), "Deadline must be in the future");
        assert!(validations_required <= group.validators.len() as u32, "Not enough validators in the group");
        
        let goal = Goal {
            description,
            deadline,
            stake_amount,
            status: GoalStatus::InProgress,
            validators: vec![],
            validations_received: 0,
            validations_required,
        };
        
        group.active_goals.insert(&account_id, &goal);
        self.groups.insert(&group_name, &group);
        
        let current_stake = self.user_stakes.get(&account_id).unwrap_or(0);
        self.user_stakes.insert(&account_id, &(current_stake + stake_amount));
    }

    pub fn validate_goal(&mut self, group_name: String, goal_owner: AccountId) {
        let mut group = self.groups.get(&group_name).expect("Group not found");
        let validator_id = env::predecessor_account_id();
        
        assert!(group.validators.contains(&validator_id), "Not a validator in this group");
        
        let mut goal = group.active_goals.get(&goal_owner).expect("Goal not found");
        assert!(!goal.validators.contains(&validator_id), "Already validated this goal");
        
        goal.validators.push(validator_id);
        goal.validations_received += 1;
        
        if goal.validations_received >= goal.validations_required {
            goal.status = GoalStatus::Validated;
            
            // Move goal from active to completed
            group.active_goals.remove(&goal_owner);
            group.completed_goals.insert(&goal_owner, &goal);
        } else {
            group.active_goals.insert(&goal_owner, &goal);
        }
        
        self.groups.insert(&group_name, &group);
    }

    pub fn mark_goal_completed(&mut self, group_name: String) {
        let mut group = self.groups.get(&group_name).expect("Group not found");
        let account_id = env::predecessor_account_id();
        
        let goal = group.active_goals.get(&account_id).expect("No active goal found");
        assert!(goal.status == GoalStatus::Validated, "Goal must be validated first");
        
        group.active_goals.remove(&account_id);
        group.completed_goals.insert(&account_id, &goal);
        self.groups.insert(&group_name, &group);
    }

    pub fn check_expired_goals(&mut self, group_name: String) {
        let mut group = self.groups.get(&group_name).expect("Group not found");
        let current_time = env::block_timestamp();
        
        let mut expired_goals: Vec<(AccountId, Goal)> = Vec::new();
        
        for (account_id, goal) in group.active_goals.iter() {
            if current_time > goal.deadline && goal.status != GoalStatus::Validated {
                expired_goals.push((account_id.clone(), goal.clone()));
            }
        }
        
        for (account_id, mut goal) in expired_goals {
            goal.status = GoalStatus::Failed;
            group.active_goals.remove(&account_id);
            group.failed_goals.insert(&account_id, &goal);
        }
        
        self.groups.insert(&group_name, &group);
    }

    pub fn distribute_rewards(&mut self, group_name: String) {
        let mut group = self.groups.get(&group_name).expect("Group not found");
        
        let total_failed_stakes: Balance = group.failed_goals.iter().map(|(_, goal)| goal.stake_amount).sum();
        
        if total_failed_stakes == 0 {
            return;
        }
        
        // Calculate distribution amounts
        let platform_fee = total_failed_stakes * 10 / 100;  // 10% platform fee
        let validator_reward = total_failed_stakes * 20 / 100;  // 20% to validators
        let successful_reward = total_failed_stakes * 70 / 100;  // 70% to successful participants
        
        // Add platform fee
        self.platform_fees += platform_fee;
        
        // Distribute to validators
        let validator_count = group.validators.len() as u128;
        if validator_count > 0 {
            let reward_per_validator = validator_reward / validator_count;
            for validator in &group.validators {
                let current_stake = self.user_stakes.get(validator).unwrap_or(0);
                self.user_stakes.insert(validator, &(current_stake + reward_per_validator));
            }
        }
        
        // Distribute to successful participants
        let successful_count = group.completed_goals.len() as u128;
        if successful_count > 0 {
            let reward_per_successful = successful_reward / successful_count;
            for (account_id, _) in group.completed_goals.iter() {
                let current_stake = self.user_stakes.get(&account_id).unwrap_or(0);
                self.user_stakes.insert(&account_id, &(current_stake + reward_per_successful));
            }
        }
        
        // Clear failed goals after distribution
        for (account_id, _) in group.failed_goals.iter() {
            let current_stake = self.user_stakes.get(&account_id).unwrap_or(0);
            let goal_stake = group.failed_goals.get(&account_id).unwrap().stake_amount;
            self.user_stakes.insert(&account_id, &(current_stake - goal_stake));
        }
        
        group.failed_goals.clear();
        self.groups.insert(&group_name, &group);
    }

    pub fn withdraw_stake(&mut self) -> Promise {
        let account_id = env::predecessor_account_id();
        let stake = self.user_stakes.get(&account_id).unwrap_or(0);
        
        assert!(stake > 0, "No stake to withdraw");
        
        self.user_stakes.insert(&account_id, &0);
        Promise::new(account_id).transfer(stake)
    }

    // View methods
    pub fn get_user_stake(&self, account_id: AccountId) -> Balance {
        self.user_stakes.get(&account_id).unwrap_or(0)
    }
    
    pub fn get_group(&self, group_name: String) -> Option<Group> {
        self.groups.get(&group_name)
    }
    
    pub fn get_platform_fees(&self) -> Balance {
        self.platform_fees
    }
}
