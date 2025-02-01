import { useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { IDL } from "../../anchor/idl";

export default function CreateMail() {
  const [message, setMessage] = useState("");
  const [unlockAfter, setUnlockAfter] = useState(1);
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
      const tx = await program.methods.create(message, unlockAfter).rpc();
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="message"
      >
        Message
      </label>
      <textarea
        id="message"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />

      <label
        className="block text-gray-700 text-sm font-bold mt-4 mb-2"
        htmlFor="unlockAfter"
      >
        Unlock After (days)
      </label>
      <input
        id="unlockAfter"
        type="number"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={unlockAfter}
        onChange={(e) => setUnlockAfter(e.target.value)}
        placeholder="Enter number of hours"
      />

      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
        onClick={createMail}
      >
        Create
      </button>
    </div>
  );
}
