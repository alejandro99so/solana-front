// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import MyFirstIDL from '../target/idl/my_first.json';
import type { MyFirst } from '../target/types/my_first';

// Re-export the generated IDL and type
export { MyFirst, MyFirstIDL };

// The programId is imported from the program IDL.
export const MY_FIRST_PROGRAM_ID = new PublicKey(MyFirstIDL.address);

// This is a helper function to get the MyFirst Anchor program.
export function getMyFirstProgram(provider: AnchorProvider) {
  return new Program(MyFirstIDL as MyFirst, provider);
}

// This is a helper function to get the program ID for the MyFirst program depending on the cluster.
export function getMyFirstProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return MY_FIRST_PROGRAM_ID;
  }
}
