import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl, Keypair } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";
import { HomeScreen } from "./pages/home-screen";

export const Wallet = ({ children }: { children: React.ReactNode }) => {
  const network = WalletAdapterNetwork.Devnet;

  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = useMemo(() => "http://127.0.0.1:8899", []);

  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);

  console.log(wallets);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const local_account_1 = () => {
  const secretKey = Uint8Array.from([
    56, 215, 208, 54, 6, 173, 166, 253, 35, 73, 161, 89, 232, 64, 210, 74, 37,
    249, 131, 240, 230, 20, 15, 228, 173, 50, 222, 220, 241, 116, 107, 51, 145,
    186, 213, 158, 199, 181, 135, 89, 109, 145, 52, 242, 236, 51, 142, 254, 187,
    21, 45, 125, 185, 49, 154, 223, 208, 182, 104, 251, 81, 240, 195, 121,
  ]);
  return Keypair.fromSecretKey(secretKey);
};

export const local_account_2 = () => {
  const secretKey = Uint8Array.from([
    89, 81, 101, 209, 170, 56, 61, 134, 135, 240, 47, 33, 118, 107, 140, 111,
    135, 82, 2, 32, 250, 163, 206, 79, 67, 191, 124, 164, 174, 174, 35, 241, 15,
    198, 45, 180, 237, 119, 196, 176, 22, 155, 81, 231, 99, 6, 37, 83, 194, 109,
    97, 161, 244, 91, 196, 207, 132, 67, 193, 12, 56, 44, 5, 9,
  ]);
  return Keypair.fromSecretKey(secretKey);
};

function App() {
  return (
    <Wallet>
      <HomeScreen />
    </Wallet>
  );
}

export default App;
