import { toBytes } from 'viem'
import { getWalletClient } from 'wagmi/actions'

import { Tx } from '@/api/generated-api'
import httpClient from '@/api/httpClient'
import { ERRORS } from '@/app/constants/errors'
import { useDealStore } from '@/app/store/deal-store'
import { Button } from '@/components/ui/button'

export const CancelSignButton = () => {
  const { deal, updateDeal } = useDealStore()

  const cancelDeal = async () => {
    try {
      if (!deal) {
        throw new Error(ERRORS.DEAL_EXISTS)
      }

      const { data: tx } = await httpClient<Tx>({
        url: `deals/${deal.id}/tx/DEAL_INIT?silent=0`,
        method: 'GET'
      })

      if (!tx.transaction) {
        throw new Error(ERRORS.TX_EXISTS)
      }

      const walletClient = await getWalletClient()

      const messageToSign = toBytes(tx.transaction)

      if (walletClient) {
        const signature = await walletClient.signMessage({
          message: { raw: messageToSign }
        })

        await httpClient({
          url: `deals/${deal.id}/tx/DEAL_INIT/sign`,
          method: 'DELETE',
          data: {
            signature,
            transaction: tx.transaction
          }
        })

        await updateDeal()
      } else {
        throw new Error(ERRORS.WALLET_EXISTS)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <Button variant={'destructive'} onClick={cancelDeal}>
        Cancel sign
      </Button>

      <span className="text-center text-[13px] text-[#AD4C4C]">
        You can cancel the deal before it starts.
      </span>
    </div>
  )
}
