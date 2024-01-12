import { Button } from '@/components/ui/button'

export const PerformanceBond = () => {
  return (
    <>
      <div className="flex flex-col gap-[8px] leading-[120%]">
        <span className="text-[29px] font-[500]">Performance bond</span>
        <span className="text-[13px] text-[#656975]">
          This is guarantee to mitigate the risk
        </span>
      </div>

      <div className="relative flex h-full w-full justify-between  rounded-[13px] border-[1px] border-[#2A2E37] bg-[#15151A] p-[20px]">
        <div className="flex flex-col">
          <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
            <span className="text-[15px] font-[600] text-[#656975]">
              EXECUTOR
            </span>
          </div>

          <div className="flex items-end gap-[8px]">
            <span className="text-[29px] font-[500]">1.4</span>
            <span className="mb-[9px] text-[15px] text-[#656975]">WBNB</span>
          </div>

          <span className="text-[13px] font-[500] text-[#656975]">
            Upon completion of the deal, the funds will be returned to the
            executor
          </span>
        </div>

        <Button
          size={'default'}
          variant={'tertiary'}
          className="absolute right-[20px] top-[20px]"
        >
          Edit
        </Button>
      </div>

      <div className="relative flex h-full w-full justify-between  rounded-[13px] border-[1px] border-[#2A2E37] bg-[#15151A] p-[20px]">
        <div className="flex flex-col">
          <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
            <span className="text-[15px] font-[600] text-[#656975]">
              CLIENT
            </span>
          </div>

          <div className="flex items-end gap-[8px]">
            <span className="text-[29px] font-[500]">1.4</span>
            <span className="mb-[9px] text-[15px] text-[#656975]">WBNB</span>
          </div>

          <span className="text-[13px] font-[500] text-[#656975]">
            Upon completion of the deal, the funds will be returned to the
            executor
          </span>
        </div>

        <Button
          size={'default'}
          variant={'tertiary'}
          className="absolute right-[20px] top-[20px]"
        >
          Edit
        </Button>
      </div>
    </>
  )
}
