import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Mailfromfuture } from "../target/types/mailfromfuture";
import { PublicKey } from "@solana/web3.js";

describe("mailfromfuture", () => {
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.Mailfromfuture as Program<Mailfromfuture>;
    const [pda] = PublicKey.findProgramAddressSync([Buffer.from("counter")], program.programId);

    it("Is initialized!", async () => {
        const tx = await program.methods.initialize().rpc();
        console.log("Your transaction signature", tx);
        const mailData = await program.account.mail.fetch(pda);
        console.log("Mail Data: ", mailData);
    });

    it("Create", async () => {
        const tx = await program.methods.create("This is message from to you.", 5).rpc();
        console.log("Your transaction signature", tx);
        const mailData = await program.account.mail.fetch(pda);
        console.log("Mail Data: ", mailData);
    });
});
