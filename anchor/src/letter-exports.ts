// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import LetterIDL from '../target/idl/letter.json'
import type { Letter } from '../target/types/letter'

// Re-export the generated IDL and type
export { Letter, LetterIDL }

// The programId is imported from the program IDL.
export const LETTER_PROGRAM_ID = new PublicKey(LetterIDL.address)

// This is a helper function to get the Letter Anchor program.
export function getLetterProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...LetterIDL, address: address ? address.toBase58() : LetterIDL.address } as Letter, provider)
}

// This is a helper function to get the program ID for the Letter program depending on the cluster.
export function getLetterProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Letter program on devnet and testnet.
      return new PublicKey('HKth2MF3hxUmwBis4xSiw7jC6duX4LQrRYd2JRvQ1Z4n')
    case 'mainnet-beta':
    default:
      return LETTER_PROGRAM_ID
  }
}
