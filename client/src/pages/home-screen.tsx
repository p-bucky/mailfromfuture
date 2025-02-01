import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import CreateMail from "../components/create-mail/create-mail";

export const HomeScreen = () => {
  return (
    <div>
      <div className="flex justify-end p-5">
        <div className="flex space-x-2">
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>
      </div>
      <CreateMail />
    </div>
  );
};
