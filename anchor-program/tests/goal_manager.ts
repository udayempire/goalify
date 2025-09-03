import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { GoalManager } from "../target/types/goal_manager"; // auto-generated IDL
import { assert } from "chai";
import { program } from "@coral-xyz/anchor/dist/cjs/native/system";

describe("goal_manager",async ()=>{
    //configure to local cluster.
    const provider = anchor.AnchorProvider.local(); //points to a local Solana validator.
    anchor.setProvider(provider);
    const program = anchor.workspace.GoalManager as Program<GoalManager>;
    const payer = provider.wallet;
    let goalPda: anchor.web3.PublicKey;
    let goalBump: number;
    before(async()=>{
        const [goalPda, goalBump] = await anchor.web3.PublicKey.findProgramAddress(
            [
                Buffer.from("goal"),
                payer.publicKey.toBuffer(),
                Buffer.from("My Goal Title"),
                Buffer.from(new Date().getTime().toString())
            ],
            program.programId
        );
    })
    //Create a goal
    it("Creates a new Goal", async()=>{
        const title = "My Goal Title";
        const description = "Goal Description";
        const stake_amount = new anchor.BN(1000);
        const start_date = new anchor.BN(Date.now() / 1000);
        const end_date = new anchor.BN(Date.now() / 1000 + 3600);
        const max_participants = new anchor.BN(100)
    
        await program.methods
        .createGoalSession(title,description,stake_amount,start_date,end_date,max_participants)
        .accounts({
            goal: goalPda,
            creator: payer.publicKey,
            systemProgram: anchor.web3.systemProgram.programId
        })
        .rpc();
        const goalAccount = await program.account.goal.fetch(goalPda);
        assert.equal(goalAccount.title,title);
        assert.equal(goalAccount.description,description)
    });
});


