import { toBytes } from 'viem'
import { getWalletClient } from 'wagmi/actions'

import { api } from '@/api/client'
import { Tx } from '@/api/generated-api'
import { useDeal } from '@/api/hooks/useDeal'
import { useUser } from '@/api/hooks/useUser'
import httpClient from '@/api/httpClient'
import { ERRORS } from '@/app/constants/errors'
import { Button } from '@/components/ui/button'
import { useSolanaConnect } from '@/providers/SolanaProvider'

export const FinishDealButton = () => {
  const { deal, refetchDeal } = useDeal()
  const { user } = useUser()
  const { signTransactionBase64 } = useSolanaConnect()

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

      let signature: string
      if (user?.blockchain === 'bsc') {
        const walletClient = await getWalletClient()

        const messageToSign = toBytes(tx.transaction)

        if (walletClient) {
          signature = await walletClient.signMessage({
            message: { raw: messageToSign }
          })
        } else {
          throw new Error(ERRORS.WALLET_EXISTS)
        }
      } else if (user?.blockchain === 'solana') {
        signature = await signTransactionBase64(tx.transaction)
      } else {
        throw new Error('invalid blockchain')
      }

      await api.deals.txSignCreate(deal.id, 'DEAL_FINISH', {
        signature,
        transaction: tx.transaction
      })

      await refetchDeal()
    } catch (error) {
      console.error(error)
    }
  }

  return <Button onClick={finishDeal}>Finish deal</Button>
}
