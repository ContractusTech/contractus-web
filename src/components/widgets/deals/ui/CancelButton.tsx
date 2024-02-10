import { useRouter } from 'next/navigation'
import { toBytes } from 'viem'
import { getWalletClient } from 'wagmi/actions'

import { api } from '@/api/client'
import { Tx } from '@/api/generated-api'
import { useDeal } from '@/api/hooks/useDeal'
import { useUser } from '@/api/hooks/useUser'
import httpClient from '@/api/httpClient'
import { ERRORS } from '@/app/constants/errors'
import { PAGES } from '@/app/constants/pages'
import { Button } from '@/components/ui/button'
import { useSolanaConnect } from '@/providers/SolanaProvider'

export const CancelButton = () => {
  const { deal, refetchDeal } = useDeal()
  const router = useRouter()
  const { user } = useUser()
  const { signTransactionBase64 } = useSolanaConnect()

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

        let signature: string
        if (user?.blockchain === 'bsc') {
          const walletClient = await getWalletClient()

          const messageToSign = toBytes(tx.transaction)

          if (walletClient) {
            signature = await walletClient.signMessage({
              message: { raw: messageToSign }
            })
          } else {
            throw new Error('No eth wallet')
          }
        } else if (user?.blockchain === 'solana') {
          signature = await signTransactionBase64(tx.transaction)
        } else {
          throw new Error('Invalid blockchain')
        }

        await httpClient({
          url: `deals/${deal.id}/tx/DEAL_CANCELED/sign`,
          method: 'POST',
          data: {
            signature: signature,
            transaction: tx.transaction
          }
        })

        await refetchDeal()
      } else {
        await api.deals.txSignDelete(deal.id, 'DEAL_INIT')
      }
      await refetchDeal()

      router.push(PAGES.MAIN)
    } catch (error) {
      console.log(error)
    }
  }

  return <Button onClick={handleCancelDeal}>Cancel deal</Button>
}
