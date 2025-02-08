import { getLetterProgram, getLetterProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useLetterProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getLetterProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getLetterProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['letter', 'all', { cluster }],
    queryFn: () => program.account.letterState.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const create = useMutation({
    mutationKey: ['letter', 'create', { cluster }],
    mutationFn: ({ title, message }) => {
      return program.methods.createLetter(title, message).rpc()
    },
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    create,
  }
}

export function useLetterProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useLetterProgram()
  const programId = new PublicKey(
    "HKth2MF3hxUmwBis4xSiw7jC6duX4LQrRYd2JRvQ1Z4n"
  );

  const accountQuery = useQuery({
    queryKey: ['letter', 'fetch', { cluster, account }],
    queryFn: () => program.account.letterState.fetch(account),
  })

  return {
    accountQuery,
  }
}
