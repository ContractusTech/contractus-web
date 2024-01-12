import { Button } from '@/components/ui/button'

export const CheckerEdit = () => {
  return (
    <div className="flex h-full w-full justify-between  rounded-[13px] border-[1px] border-[#2A2E37] bg-[#15151A] p-[20px]">
      <div className="flex flex-col">
        <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
          <span className="text-[15px] font-[600] text-[#656975]">CHECKER</span>
        </div>
        <span className="mt-[16px] text-[22px] font-[500]">Empty</span>
        <span className="text-[13px] font-[500] text-[#656975]">
          Perform the work specified in the contract
        </span>
      </div>

      <div className="flex gap-[8px]">
        <Button variant={'tertiary'}>Edit</Button>
        <Button variant={'tertiary'}>Fee</Button>
      </div>
    </div>
  )
}
