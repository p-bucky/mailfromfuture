import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { WalletAdapter } from "@solana/wallet-adapter-base"; 

export class LocalWalletAdapter implements WalletAdapter {
  private _publicKey: PublicKey;
  
  constructor(private keypair: Keypair) {
    this._publicKey = keypair.publicKey;
  }

  async signTransaction(transaction: Transaction): Promise<Transaction> {
    transaction.partialSign(this.keypair);
    return transaction;
  }

  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    return transactions.map((tx) => {
      tx.partialSign(this.keypair);
      return tx;
    });
  }

  async connect(): Promise<void> {
  }

  async disconnect(): Promise<void> {
  }

  get publicKey(): PublicKey {
    return this._publicKey;
  }

  get connected(): boolean {
    return true;
  }

  get name(): string {
    return "Local Wallet";
  }

  get ready(): boolean {
    return true;
  }

  get select(): boolean {
    return false;
  }
}

