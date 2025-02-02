import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import CreateMail from "../components/create-mail/create-mail";
import { local_account } from "../App";

export const HomeScreen = () => {
  return (
    <div>
      <div className="flex justify-end p-5">
        <div className="flex space-x-2">
          <WalletMultiButton />
          <WalletDisconnectButton />
          {/* Local Account */}
          <p>{local_account()?.publicKey.toString().slice(local_account()?.publicKey.toString().length - 5, local_account()?.publicKey.toString().length)}</p>
        </div>
      </div>
      <CreateMail />
    </div>
  );
};
