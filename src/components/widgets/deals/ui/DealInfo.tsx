import { Deal } from '@/api/generated-api'
import { Button } from '@/components/ui/button'
import Tag from '@/components/ui/tag'
import { ToolTip } from '@/components/ui/tooltip'

import { AmountChange } from './AmountChange'

export const DealInfo = ({ deal }: { deal: Deal }) => {
  return (
    <div className="grid h-[80px] grid-cols-[7fr_3fr] items-center gap-[13px]">
      <div className="grid h-full grid-cols-2 items-center rounded-[13px] border-[1px] border-[#2A2E37] p-[12px]">
        <div className="mr-[12px] flex h-full flex-col ">
          <div className="flex items-center gap-[8px] ">
            <span className="text-[12px] text-[#8b8f97]">CLIENT</span>
            <Tag>You</Tag>
            <Tag>Owner</Tag>
          </div>
          <span className="mt-[auto] self-start">0x123...123</span>
        </div>

        <div className="flex h-full  justify-between border-l-[1px] border-l-[#2A2E37] pl-[12px]">
          <div className="flex flex-col ">
            <span className="text-[12px] text-[#8b8f97]">AMOUNT OF DEAL</span>
            <span className="mt-[auto]">Empty</span>
          </div>

          <div className="flex items-end">
            <AmountChange deal={deal} />
          </div>
        </div>
      </div>

      <div className="flex h-full  justify-between rounded-[13px] border-[1px] border-[#2A2E37] p-[12px]">
        <div className="flex flex-col">
          <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
            <span>EXECUTOR</span>
            <ToolTip content="Performs the work specified in the contract." />
          </div>
          <span className="mt-[auto]">Empty</span>
        </div>

        <Button size={'sm'} className="mt-[auto]">
          Set
        </Button>
      </div>
    </div>
  )
}
