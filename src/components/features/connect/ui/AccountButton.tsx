import { ChevronDown } from 'lucide-react'

import { useUserStore } from '@/app/store/user-store'
import { BalanceWalletIcon } from '@/assets/svg/BalanceWalletIcon'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { transformString } from '@/lib/utils'

import { useEvmConnect } from '../model/useEvmConnect'
import { useSolanaConnect } from './SolanaProvider'

export const AccountButton = () => {
  const { connectedUser } = useUserStore()
  const { handleDisconnect: handleSolanaDisconnect } = useSolanaConnect()
  const { handleDisconnect: handleEvmDisconnect } = useEvmConnect()

  if (!connectedUser) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <Button
          variant={'secondary'}
          className="h-42 items-center gap-[8px] md:gap-x-8 md:px-5 md:pl-8 md:pr-5"
        >
          <BalanceWalletIcon className="h-16 w-16" />
          <span className="md:hidden">
            {transformString(connectedUser.publicKey)}
          </span>
          <ChevronDown className="h-16 w-16 text-textSecondary" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            connectedUser.blockchain === 'solana'
              ? handleSolanaDisconnect()
              : handleEvmDisconnect()
          }
        >
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
