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
import { useSolanaConnect } from '../model/useSolanaConnect'

export const AccountButton = () => {
  const { connectedUser } = useUserStore()
  const { handleDisconnect: handleSolanaDisconnect } = useSolanaConnect()
  const { handleDisconnect: handleEvmDisconnect } = useEvmConnect()

  if (!connectedUser) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'secondary'} className="items-center gap-[8px]">
          <BalanceWalletIcon />
          {transformString(connectedUser.publicKey)}
          <ChevronDown />
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
