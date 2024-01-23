import { toBytes } from 'viem'
import { getWalletClient } from 'wagmi/actions'

import { api } from '@/api/client'
import { Tx } from '@/api/generated-api'
import httpClient from '@/api/httpClient'
import { ERRORS } from '@/app/constants/errors'
import { useDealStore } from '@/app/store/deal-store'
import { Button } from '@/components/ui/button'

export const CancelButton = () => {
  const { deal, updateDeal } = useDealStore()

  const handleCancelDeal = async () => {
    try {
      if (!deal) {
        throw new Error(ERRORS.DEAL_EXISTS)
      }

      if (deal.status === 'STARTED') {
        const { data: tx } = await httpClient<Tx>({
          url: `deals/${deal.id}/tx/DEAL_CANCELED?silent=0`,
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
            url: `deals/${deal.id}/tx/DEAL_CANCELED/sign`,
            method: 'POST',
            data: {
              signature,
              transaction: tx.transaction
            }
          })

          await updateDeal()
        }
      } else {
        await api.deals.txSignDelete(deal.id, 'DEAL_INIT')
      }
      await updateDeal()
    } catch (error) {
      console.log(error)
    }
  }

  return <Button onClick={handleCancelDeal}>Cancel deal</Button>
}
