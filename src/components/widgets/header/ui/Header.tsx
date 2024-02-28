import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { FC, ReactElement } from 'react'

import { Logo } from '@/components/entities/logo'
import { AccountButton } from '@/components/features/connect'

import { EditDealHeader } from '../../deals/ui/EditDealHeader'
import { UserStatus } from './UserStatus'

type Props = {
  children?: string | ReactElement | JSX.Element | JSX.Element[]
  className?: string
}
const Header: FC<Props> = ({ className }) => {
  const pathname = usePathname()

  return (
    <header
      className={clsx(
        'flex h-54 flex-shrink-0 flex-grow-0 items-center justify-between md:pb-5',
        className
      )}
    >
      <div
        className={`mt-auto basis-[200px] md:basis-60 ${
          pathname?.includes('deal') && 'sm:hidden'
        }`}
      >
        <Logo />
      </div>
      <div className="flex w-full max-w-[540px] justify-center">
        {pathname?.includes('deal') ? <EditDealHeader /> : <UserStatus />}
      </div>
      <div className="mt-auto basis-[200px] md:basis-60">
        <AccountButton />
      </div>
    </header>
  )
}

export default Header
