import Link from 'next/link'

import { PAGES } from '@/app/constants/pages'

export const Footer = () => {
  return (
    <footer className="m-[0_auto] mt-[100px] flex w-full max-w-[540px] items-center  border-t-[1px] border-[#1C1F25] py-[12px] text-[11px] text-[#656975]">
      <span>HashHorizon Tech</span>

      <div className="ml-[auto] flex items-center gap-[10px]">
        <Link href={PAGES.MAIN}>Home</Link>
        <Link href={PAGES.MAIN}>Privacy</Link>
        <Link href={PAGES.MAIN}>Terms</Link>
        <Link href={PAGES.MAIN}>Github</Link>

        <span>v1.0.1</span>
      </div>
    </footer>
  )
}
