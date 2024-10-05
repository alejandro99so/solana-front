'use client';

import { getMyFirstProgram, getMyFirstProgramId } from '@my-first/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useMyFirstProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getMyFirstProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getMyFirstProgram(provider);

  const accounts = useQuery({
    queryKey: ['my-first', 'all', { cluster }],
    queryFn: () => program.account.myFirst.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['my-first', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ myFirst: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function useMyFirstProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useMyFirstProgram();

  const accountQuery = useQuery({
    queryKey: ['my-first', 'fetch', { cluster, account }],
    queryFn: () => program.account.myFirst.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['my-first', 'close', { cluster, account }],
    mutationFn: () =>
      program.methods.close().accounts({ myFirst: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['my-first', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods.decrement().accounts({ myFirst: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['my-first', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods.increment().accounts({ myFirst: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['my-first', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods.set(value).accounts({ myFirst: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
