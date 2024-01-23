import { toBytes } from 'viem'
import { getWalletClient } from 'wagmi/actions'

import { api } from '@/api/client'
import { Tx } from '@/api/generated-api'
import httpClient from '@/api/httpClient'
import { ERRORS } from '@/app/constants/errors'
import { useDealStore } from '@/app/store/deal-store'
import { useApprove } from '@/components/features/approve'
import { Button } from '@/components/ui/button'

export const StartDealBtn = () => {
  const { deal, updateDeal } = useDealStore()
  const { approve } = useApprove()

  const handleSign = async () => {
    if (!deal) {
      throw new Error(ERRORS.DEAL_EXISTS)
    }

    await approve()

    const { data: tx } = await httpClient<Tx>({
      url: `deals/${deal.id}/tx/DEAL_INIT?silent=0`,
      method: 'GET'
    })

    if (!tx.transaction) {
      throw new Error('No hash transaction')
    }

    const walletClient = await getWalletClient()

    const messageToSign = toBytes(tx.transaction)

    if (walletClient) {
      const signature = await walletClient.signMessage({
        message: { raw: messageToSign }
      })

      await api.deals.txSignCreate(deal.id, 'DEAL_INIT', {
        signature,
        transaction: tx.transaction
      })

      await updateDeal()
    } else {
      throw new Error('Error on getting wallet client for sign transaction')
    }
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
