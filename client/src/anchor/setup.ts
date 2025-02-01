import {IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL, Mailfromfuture } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const program = new Program<Mailfromfuture>(IDL, {
  connection,
});

export const [mailPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("mail")],
  program.programId
);

export type MailData = IdlAccounts<Mailfromfuture>["mail"];
