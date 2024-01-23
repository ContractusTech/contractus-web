import { toBytes } from 'viem'
import { getWalletClient } from 'wagmi/actions'

import { api } from '@/api/client'
import { Tx } from '@/api/generated-api'
import httpClient from '@/api/httpClient'
import { ERRORS } from '@/app/constants/errors'
import { useDealStore } from '@/app/store/deal-store'
import { Button } from '@/components/ui/button'

export const FinishDealButton = () => {
  const { deal, updateDeal } = useDealStore()

  const finishDeal = async () => {
    try {
      if (!deal) {
        throw new Error(ERRORS.DEAL_EXISTS)
      }

      const { data: tx } = await httpClient<Tx>({
        url: `deals/${deal.id}/tx/DEAL_FINISH?silent=0`,
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

        await api.deals.txSignCreate(deal.id, 'DEAL_FINISH', {
          signature,
          transaction: tx.transaction
        })

        await updateDeal()
      } else {
        throw new Error(ERRORS.WALLET_EXISTS)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return <Button onClick={finishDeal}>Finish deal</Button>
}
