import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { GoalManager } from "../target/types/goal_manager"; // auto-generated IDL
import { assert } from "chai";
// import { program } from "@coral-xyz/anchor/dist/cjs/native/system";

describe("goal_manager", async () => {
    //configure to local cluster.
    const provider = anchor.AnchorProvider.local(); //points to a local Solana validator.
    anchor.setProvider(provider);
    const program = anchor.workspace.GoalManager as Program<GoalManager>;
    const payer = provider.wallet;

    let goalPda: anchor.web3.PublicKey;
    let goalBump: number;
    let vaultPda: anchor.web3.PublicKey;
    let vaultBump: number;
    before(async () => {
        const title = "My Goal Title";
        const createdAt = Math.floor(Date.now() / 1000);

        //Generate GoalPDA
        const [goalPda, goalBump] = await anchor.web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from("goal"),
                payer.publicKey.toBuffer(),
                Buffer.from(title),
                Buffer.from(createdAt.toString().padStart(8, '0'))
            ],
            program.programId
        );
        const [vaultPda] = anchor.web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from("vault"),
                payer.publicKey.toBuffer(),
                goalPda.toBuffer()
            ],
            program.programId
        )
    })
    //Create a goal
    it("Creates a new Goal", async () => {
        const title = "My Goal Title";
        const description = "Goal Description";
        const rules_url = "https://example.com";
        const stake_amount = new anchor.BN(1000);
        const start_date = new anchor.BN(Math.floor(Date.now() / 1000) + 3600);
        const end_date = new anchor.BN(Math.floor(Date.now() / 1000) + 7200);
        const max_participants = 100;

        const creationAt = new anchor.BN(Math.floor(Date.now() / 1000));

        //generate goal pda
        [goalPda, goalBump] = await anchor.web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from("goal"),
                payer.publicKey.toBuffer(),
                Buffer.from(title),
                creationAt.toArrayLike(Buffer, 'le', 8)
            ],
            program.programId
        );

        // Generate vault PDA
        [vaultPda, vaultBump] = await anchor.web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from("vault"),
                payer.publicKey.toBuffer(),
                goalPda.toBuffer()
            ],
            program.programId
        );

        await program.methods.createGoalSession(
            Buffer.from("title"),
            Buffer.from("description"),
            Buffer.from("rules_url"),
            start_date,
            end_date,
            max_participants,
            stake_amount
        )
        .accounts({
            goal: goalPda,
            vault: vaultPda,
            creator: payer.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId
        })
        .rpc();
        const goalAccount = await program.account.goal.fetch(goalPda);
        //converting buffers to string for comparison
        assert.equal(
            Buffer.from(goalAccount.title).toString('utf8').replace(/\0/g,''),
            title
        );
        assert.equal(
            Buffer.from(goalAccount.description).toString('utf8')replace(/\0/g,''),
            description
        );
        assert.equal(goalAccount.stakeAmount.toNumber(), 1000);
        assert.equal(goalAccount.maxParticipants, 100);
        assert.equal(goalAccount.creator.toString(), payer.publicKey.toString());
        assert.equal(goalAccount.endDate.toNumber(), end_date.toNumber());3
        // The stored start_date should be the user-selected date, not the PDA creation time
        assert.equal(goalAccount.startDate.toNumber(), start_date.toNumber());
    });
});


