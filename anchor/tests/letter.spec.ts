import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Letter} from '../target/types/letter'

describe('letter', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Letter as Program<Letter>

  const letterKeypair = Keypair.generate()

  it('Initialize Letter', async () => {
    await program.methods
      .initialize()
      .accounts({
        letter: letterKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([letterKeypair])
      .rpc()

    const currentCount = await program.account.letter.fetch(letterKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Letter', async () => {
    await program.methods.increment().accounts({ letter: letterKeypair.publicKey }).rpc()

    const currentCount = await program.account.letter.fetch(letterKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Letter Again', async () => {
    await program.methods.increment().accounts({ letter: letterKeypair.publicKey }).rpc()

    const currentCount = await program.account.letter.fetch(letterKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Letter', async () => {
    await program.methods.decrement().accounts({ letter: letterKeypair.publicKey }).rpc()

    const currentCount = await program.account.letter.fetch(letterKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set letter value', async () => {
    await program.methods.set(42).accounts({ letter: letterKeypair.publicKey }).rpc()

    const currentCount = await program.account.letter.fetch(letterKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the letter account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        letter: letterKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.letter.fetchNullable(letterKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
