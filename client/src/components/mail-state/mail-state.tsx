import { useEffect } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { IDL } from "../../anchor/idl";

const programId = new PublicKey(IDL.address);

export default function MailState() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const getProvider = () => {
    if (!wallet) return null;
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "processed"
    );
    return new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });
  };

  const createMail = async () => {
    const provider = getProvider();
    if (!provider) return console.error("Provider not initialized");

    const program = new Program(IDL, provider);
    try {
      const tx = await program.methods.create("this is test", 4).rpc();
      console.log("Transaction:", tx);
    } catch (err) {
      console.error("Error creating mail:", err);
    }
  };

  const fetch = async () => {
    const provider = getProvider();
    if (!provider) return;

    const program = new Program(IDL, provider);

    try {
      const accounts = await connection.getParsedProgramAccounts(
        new PublicKey(IDL.address)
      );

      if (accounts.length === 0) {
        console.log("No accounts found");
        return;
      }

      for (const account of accounts) {
        const data = await program.account.mail.fetch(account.pubkey);
        console.log("Fetched data:", data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetch();
  }, [wallet]);

  return (
    <p className="text-lg">
      <button onClick={createMail}>Create</button>
    </p>
  );
}
