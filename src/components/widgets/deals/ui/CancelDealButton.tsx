import { useDealStore } from '@/app/store/deal-store'
import { Button } from '@/components/ui/button'

// const TYPES = [
//   'DEAL_INIT',
//   'DEAL_FINISH',
//   'DEAL_CANCELED',
//   'WRAP_SOL',
//   'UNWRAP_ALL_SOL',
//   'TRANSFER',
//   'WRAP',
//   'UNWRAP'
// ]

const CancelDealButton = () => {
  const { deal } = useDealStore()

  const handleCancelDeal = async () => {
    if (!deal) {
      throw new Error('No deal')
    }

    // httpClient({
    //   url: `deals/${deal.id}/cancel`,
    //   data: { force: false },
    //   method: 'post'
    // })
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <Button variant={'destructive'} onClick={handleCancelDeal}>
        Cancel deal
      </Button>

      <span className="text-center text-[13px] text-[#AD4C4C]">
        You can cancel the deal before it starts.
      </span>
    </div>
  )
}

export default CancelDealButton
