import { ArrowBackIos } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

import { PAGES } from '@/app/constants/pages'

export const EditDealHeader = () => {
  const router = useRouter()

  return (
    <div className="grid w-[100%] flex-grow grid-cols-3 items-center  py-[20px]">
      <button
        className="w-[fit-content]"
        onClick={() => router.push(PAGES.MAIN)}
      >
        <ArrowBackIos style={{ width: 14 }} />
      </button>

      <span className="justify-self-center text-[15px] font-[500]">Deal</span>
    </div>
  )
}
