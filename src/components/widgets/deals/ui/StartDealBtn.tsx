import { toBytes } from 'viem'
import {
  getWalletClient,
  prepareWriteContract,
  waitForTransaction,
  writeContract
} from 'wagmi/actions'

import { api } from '@/api/client'
import { Tx } from '@/api/generated-api'
import httpClient from '@/api/httpClient'
import wbnbAbi from '@/app/constants/wbnbAbi'
import MESSAGES from '@/app/constants/web3'
import { useDealStore } from '@/app/store/deal-store'
import { Button } from '@/components/ui/button'

export const StartDealBtn = () => {
  const { deal } = useDealStore()

  const handleSign = async () => {
    if (!deal) {
      throw new Error('No deal')
    }

    // const { request } = await prepareWriteContract({
    //   abi: wbnbAbi,
    //   address: MESSAGES.WBNB_ADDRESS,
    //   functionName: 'approve',
    //   args: [MESSAGES.CONTRACTOR_ADDRESS, BigInt(10_000_000)]
    // })

    // const { hash } = await writeContract(request)

    // await waitForTransaction({ hash })

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
