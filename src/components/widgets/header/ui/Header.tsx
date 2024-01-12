import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { FC, ReactElement } from 'react'

import { CrownIcon } from '@/assets/svg/CrownIcon'
import { Logo } from '@/components/entities/logo'
import { AccountButton } from '@/components/features/connect'
import { Button } from '@/components/ui/button'

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
      <div className="mt-auto basis-[200px] md:basis-60">
        <Logo />
      </div>
      <div className="py-6">
        {pathname?.includes('deal') ? (
          <span>Deal</span>
        ) : (
          <Button
            variant="default"
            className="group flex h-25 items-center rounded-[7px] bg-blue px-12 py-6 text-[12px] text-secondary-foreground shadow-[0px_1px_0px_0px_#2F4AAB] hover:bg-white/90 hover:text-secondary"
          >
            <CrownIcon className="mr-4 h-16 w-16 text-secondary-foreground transition duration-200 group-hover:text-secondary" />
            Holder mode
          </Button>
        )}
      </div>
      <div className="mt-auto basis-[200px] md:basis-60">
        <AccountButton />
      </div>
    </header>
  )
}

export default Header
