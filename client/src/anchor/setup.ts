import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL, Mailfromfuture } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const programId = new PublicKey("BZ46sZ2iejuwJjZ7Ga4P7B8y7EDXmAWpKjHAAowufAg8");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<Mailfromfuture>(IDL, programId, {
  connection,
});

// Derive a PDA for the counter account, using "counter" as the seed.
// We'll use this to update the counter on-chain.
export const [mailPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("mail")],
  program.programId
);

// Define a TypeScript type for the Counter data structure based on the IDL.
// This ensures type safety when interacting with the "counter" account, facilitating development and maintenance.
export type MailData = IdlAccounts<Mailfromfuture>["mail"];
