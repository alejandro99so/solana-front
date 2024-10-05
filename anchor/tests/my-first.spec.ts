import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { MyFirst } from '../target/types/my_first';

describe('my-first', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.MyFirst as Program<MyFirst>;

  const myFirstKeypair = Keypair.generate();

  it('Initialize MyFirst', async () => {
    await program.methods
      .initialize()
      .accounts({
        myFirst: myFirstKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([myFirstKeypair])
      .rpc();

    const currentCount = await program.account.myFirst.fetch(
      myFirstKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment MyFirst', async () => {
    await program.methods
      .increment()
      .accounts({ myFirst: myFirstKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.myFirst.fetch(
      myFirstKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment MyFirst Again', async () => {
    await program.methods
      .increment()
      .accounts({ myFirst: myFirstKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.myFirst.fetch(
      myFirstKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement MyFirst', async () => {
    await program.methods
      .decrement()
      .accounts({ myFirst: myFirstKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.myFirst.fetch(
      myFirstKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set myFirst value', async () => {
    await program.methods
      .set(42)
      .accounts({ myFirst: myFirstKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.myFirst.fetch(
      myFirstKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the myFirst account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        myFirst: myFirstKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.myFirst.fetchNullable(
      myFirstKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
