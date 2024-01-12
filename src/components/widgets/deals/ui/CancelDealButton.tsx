import { Button } from '@/components/ui/button'

const CancelDealButton = () => {
  return (
    <div className="flex flex-col gap-[16px]">
      <Button variant={'destructive'}>Cancel deal</Button>

      <span className="text-center text-[13px] text-[#AD4C4C]">
        You can cancel the deal before it starts.
      </span>
    </div>
  )
}

export default CancelDealButton
