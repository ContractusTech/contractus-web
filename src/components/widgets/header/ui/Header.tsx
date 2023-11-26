import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { FC, ReactElement } from 'react'

import { useUserStore } from '@/app/store/user-store'
import { BalanceWalletIcon } from '@/assets/svg/BalanceWalletIcon'
import { CrownIcon } from '@/assets/svg/CrownIcon'
import { Logo } from '@/components/entities/logo'
import { Button } from '@/components/ui/button'
import { transformString } from '@/lib/utils'

type Props = {
  children?: string | ReactElement | JSX.Element | JSX.Element[]
  className?: string
}
const Header: FC<Props> = ({ className }) => {
  const { connectedUser } = useUserStore()

  return (
    <header
      className={clsx(
        'flex h-54 flex-shrink-0 flex-grow-0 items-center justify-between',
        className
      )}
    >
      <div className="mt-auto basis-[200px]">
        <Logo />
      </div>
      <div className="py-6">
        <Button
          variant="default"
          className="group flex h-25 items-center rounded-[7px] bg-blue px-12 py-6 text-[12px] text-secondary-foreground shadow-[0px_1px_0px_0px_#2F4AAB] hover:bg-white/90 hover:text-secondary"
        >
          <CrownIcon className="mr-4 h-16 w-16 text-secondary-foreground transition duration-200 group-hover:text-secondary" />
          Holder mode
        </Button>
      </div>
      <div className="mt-auto basis-[200px]">
        {connectedUser && (
          <Button variant={'secondary'} className="items-center gap-[8px]">
            <BalanceWalletIcon />
            {transformString(connectedUser.publicKey)}
            <ChevronDown />
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header
