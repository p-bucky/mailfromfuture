import { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { program, mailPDA } from "../../anchor/setup";

export default function MailState() {
  const { connection } = useConnection();
  const [counterData, setCounterData] = useState<any>(null);

  useEffect(() => {
    // Fetch initial account data
    program.account.mail.fetch(mailPDA).then((data) => {
      setCounterData(data);
    });

    // Subscribe to account change
    const subscriptionId = connection.onAccountChange(
      mailPDA,
      (accountInfo) => {
        setCounterData(
          program.coder.accounts.decode("counter", accountInfo.data)
        );
      }
    );

    return () => {
      // Unsubscribe from account change
      connection.removeAccountChangeListener(subscriptionId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program]);

  return <p className="text-lg">Count: {counterData?.count?.toString()}</p>;
}
