import { useDealStore } from '@/app/store/deal-store'
import { Button } from '@/components/ui/button'

export const StartDealBtn = () => {
  const { deal } = useDealStore()
  const handleSign = async () => {
    if (!deal) {
      throw new Error('No deal')
    }

    // const res = await api.deals.txSignCreate(deal.id, 'DEAL_INIT')
  }
  return (
    <div className="flex flex-col gap-[16px]">
      <Button onClick={handleSign}>Sign</Button>

      <span className="text-center text-[12px] text-[#8b8f97]">
        To start the deal, fill in the amount, deadline, the Solana accounts of
        all parties involved in the deal, and the checker fee (if a checker is
        in your deal).
      </span>
    </div>
  )
}
