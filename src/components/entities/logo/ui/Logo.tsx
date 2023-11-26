import Link from 'next/link'
import { FC } from 'react'

import { LogoHeaderIcon } from '@/assets/svg/LogoHeaderIcon'

const Logo: FC = () => {
  return (
    <Link
      href="/"
      className="relative z-[3] flex w-fit items-center justify-center"
    >
      <LogoHeaderIcon className="h-33 w-33" />
    </Link>
  )
}

export default Logo
