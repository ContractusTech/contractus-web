import { Button } from '@/components/ui/button'

export const StartDealBtn = () => {
  return (
    <div className="flex flex-col gap-[16px]">
      <Button>Sign</Button>

      <span className="text-center text-[12px] text-[#8b8f97]">
        To start the deal, fill in the amount, deadline, the Solana accounts of
        all parties involved in the deal, and the checker fee (if a checker is
        in your deal).
      </span>
    </div>
  )
}
