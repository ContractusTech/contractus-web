import { ShieldCheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const PerformanceBond = () => {
  return (
    <>
      <div className="flex items-center gap-[8px] rounded-[13px] border-[1px] border-[#2A2E37] p-[8px]">
        <ShieldCheckIcon />
        <div className="flex flex-col">
          <span>Performance bond</span>
          <span className="text-[#8b8f97]">
            This is a guarantee to mitigate the risks
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 rounded-[13px] border-[1px] border-[#2A2E37] p-[12px]">
        <div className="flex gap-[13px] pr-[13px]">
          <div className="flex flex-col">
            <span className="text-[12px] text-[#8b8f97]">CLIENT</span>
            <span>Empty</span>
            <span className="text-[12px] text-[#8b8f97]">
              Upon completion of the deal, the funds will be returned to the
              client
            </span>
          </div>

          <Button size={'sm'} className="mt-[auto]">
            Edit
          </Button>
        </div>
        <div className="flex gap-[13px] border-l-[1px] border-l-[#2A2E37] pl-[13px]">
          <div className="flex flex-col ">
            <span className="text-[12px] text-[#8b8f97]">EXECUTOR</span>
            <span>Empty</span>
            <span className="text-[12px] text-[#8b8f97]">
              Upon completion of the deal, the funds will be returned to the
              executor
            </span>
          </div>
          <Button size={'sm'} className="mt-[auto]">
            Edit
          </Button>
        </div>
      </div>
    </>
  )
}
