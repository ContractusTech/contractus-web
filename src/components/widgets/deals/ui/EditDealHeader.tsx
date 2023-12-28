import { ArrowBackIos } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

import { PAGES } from '@/app/constants/pages'

export const EditDealHeader = () => {
  const router = useRouter()

  return (
    <div className="grid w-[100%] grid-cols-3 items-center border-b-[1px] border-[#2A2E37] py-[20px]">
      <button
        className="w-[fit-content]"
        onClick={() => router.push(PAGES.MAIN)}
      >
        <ArrowBackIos style={{ width: 14 }} /> <span>Back</span>
      </button>

      <span className="justify-self-center text-[24px] font-[700]">Deal</span>
    </div>
  )
}
