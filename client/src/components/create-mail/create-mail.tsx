import { useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { IDL } from "../../anchor/idl";
import { local_account } from "../../App";
import { LocalWalletAdapter } from "../../local-wallet-adapter";

export default function CreateMail() {
  const [message, setMessage] = useState("");
  const [unlockAfter, setUnlockAfter] = useState(1);
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [dataList, setDataList] = useState([]);
  // for localhost otherwise use wallet
  // const wallet = useAnchorWallet();
  const local_wallet = new LocalWalletAdapter(local_account());

  const getProvider = () => {
    const connection = new Connection(
      // "https://api.devnet.solana.com",
      "http://127.0.0.1:8899",
      "processed"
    );
    const provider = new AnchorProvider(connection, local_wallet, {
      preflightCommitment: "processed",
    });
    return provider;
  };

  const createMail = async () => {
    const provider = getProvider();
    if (!provider) return console.error("Provider not initialized");

    const program = new Program(IDL, provider);
    // do on localhost
    // const tx = await program.methods.initialize().rpc();
    // console.log("Mail account initialized:", tx);
    try {
      const tx = await program.methods
        .create(`${Math.random()}`, 5)
        .accounts({
          signer: local_account()?.publicKey,
        })
        .rpc();
      console.log("Transaction create:", tx);
    } catch (err) {
      console.error("Error creating mail:", err);
    }
    fetch();
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

      let dataArr = [];
      for (const account of accounts) {
        const data = await program.account.mail
          .fetch(account.pubkey)
          .catch(() => {});
        dataArr = [...dataArr, data];
        console.log("Fetched data:", data);
      }
      dataArr = dataArr?.filter((_) => _);
      setDataList(dataArr);
      // console.log(dataArr)
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

      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Feature List {dataList?.length}
        </h2>
        <ul className="space-y-3">
          {dataList?.map((data, index) => (
            <li
              key={index}
              className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <span className="text-gray-700">{data.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
