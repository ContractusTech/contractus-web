import Link from 'next/link'

import { PAGES } from '@/app/constants/pages'
import { MESSAGES } from '@/app/constants/web3'

export const Footer = () => {
  return (
    <footer className="m-[0_auto] mt-[100px] flex w-full max-w-[540px] items-center  border-t-[1px] border-[#1C1F25] py-[12px] text-[11px] text-[#656975]">
      <span>HashHorizon Tech</span>

      <div className="ml-[auto] flex items-center gap-[10px]">
        <Link href={PAGES.HOME}>Home</Link>
        <Link href={PAGES.PRIVACY}>Privacy</Link>
        <Link href={PAGES.TERMS}>Terms</Link>
        <Link href={PAGES.GITHUB}>Github</Link>

        <Link
          href={PAGES.GITHUB + '/contractus-web/commit/' + MESSAGES.COMMIT_HASH}
        >
          #{MESSAGES.COMMIT_HASH}
        </Link>
      </div>
    </footer>
  )
}
