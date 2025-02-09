import { useWallet } from '@solana/wallet-adapter-react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { useLetterProgram } from './letter-data-access'
import { LetterCreate, LetterList } from './letter-ui'
import { CreateUser, UserList } from './user-ui'

export default function LetterFeature() {
  const { publicKey } = useWallet()
  const { programId } = useLetterProgram()

  return publicKey ? (
    <div>
      <AppHero title="Letter" subtitle={''}>
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <div className='flex'>
          <CreateUser />
          <UserList />
        </div>
        <LetterCreate />
        <LetterList />
      </AppHero>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
