import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { WalletAdapter } from "@solana/wallet-adapter-base"; // Import WalletAdapter

// Custom Wallet Adapter that wraps around Keypair
export class LocalWalletAdapter implements WalletAdapter {
  private _publicKey: PublicKey;
  
  constructor(private keypair: Keypair) {
    this._publicKey = keypair.publicKey;
  }

  // Sign a single transaction using the local Keypair
  async signTransaction(transaction: Transaction): Promise<Transaction> {
    transaction.partialSign(this.keypair);
    return transaction;
  }

  // Sign multiple transactions using the local Keypair
  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    return transactions.map((tx) => {
      tx.partialSign(this.keypair);
      return tx;
    });
  }

  // Connect method (does nothing for a local wallet, but must be implemented)
  async connect(): Promise<void> {
    // Local wallet doesn't need to do anything for connect
  }

  // Disconnect method (does nothing for a local wallet, but must be implemented)
  async disconnect(): Promise<void> {
    // Local wallet doesn't need to do anything for disconnect
  }

  // Getter for publicKey (must return a PublicKey instance)
  get publicKey(): PublicKey {
    return this._publicKey;
  }

  // Get connected state (always connected for the local wallet)
  get connected(): boolean {
    return true;
  }

  // Wallet name (optional, not used here)
  get name(): string {
    return "Local Wallet";
  }

  // A method to return the wallet's "ready" state (for handling things like UI state)
  get ready(): boolean {
    return true;
  }

  // For the `select` function, we return false as there is no UI to select from
  get select(): boolean {
    return false;
  }

  // Can also implement more functionality like disconnect() if needed
}

