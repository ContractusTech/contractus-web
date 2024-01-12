import { Button } from '@/components/ui/button'
import Tag from '@/components/ui/tag'

import { AmountChange } from './AmountChange'

export const DealInfo = () => {
  return (
    <div className="relative flex w-full flex-col items-center gap-[13px]">
      <div className="lex h-full w-full flex-col items-center rounded-[13px] border-[1px] border-[#2A2E37] bg-[#15151A] ">
        <div className=" flex h-full w-full flex-col p-[20px] ">
          <div className="flex items-center gap-[8px] ">
            <span className="text-[15px] font-[600] text-[#656975]">
              CLIENT
            </span>
            <Tag>You</Tag>
            <Tag>Owner</Tag>
          </div>
          <span className="mt-[9px] text-[22px] font-[500]">Empty</span>

          <Button
            variant={'tertiary'}
            className="absolute right-[20px] top-[20px]"
          >
            Edit
          </Button>
        </div>

        <div className="relative flex h-full w-full justify-between  border-t-[1px] border-t-[#2A2E37] p-[20px] ">
          <div className="flex flex-col ">
            <span className=" text-[15px] font-[600] text-[#656975]">
              AMOUNT OF DEAL
            </span>
            <span className="mt-[9px] text-[22px] font-[500]">Empty</span>
          </div>

          <div className="absolute right-[20px] top-[20px] flex items-end">
            <AmountChange />
          </div>
        </div>
      </div>

      <div className="relative flex h-full w-full justify-between  rounded-[13px] border-[1px] border-[#2A2E37] bg-[#15151A] p-[20px]">
        <div className="flex flex-col">
          <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
            <span className="text-[15px] font-[600] text-[#656975]">
              EXECUTOR
            </span>
          </div>
          <span className="mt-[16px] text-[22px] font-[500]">Empty</span>
          <span className="text-[13px] font-[500] text-[#656975]">
            Performs the work specified in the contract.
          </span>
        </div>

        <Button
          variant={'tertiary'}
          className="absolute right-[20px] top-[20px]"
        >
          Edit
        </Button>
      </div>
    </div>
  )
}
