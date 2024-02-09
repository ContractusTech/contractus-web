import { useWallet } from '@solana/wallet-adapter-react'
import { Transaction } from '@solana/web3.js'
import { toBytes } from 'viem'
import { getWalletClient } from 'wagmi/actions'

import { api } from '@/api/client'
import { Tx } from '@/api/generated-api'
import { useDeal } from '@/api/hooks/useDeal'
import { useUser } from '@/api/hooks/useUser'
import httpClient from '@/api/httpClient'
import { ERRORS } from '@/app/constants/errors'
import { useApprove } from '@/components/features/approve'
import { Button } from '@/components/ui/button'

export const StartDealBtn = () => {
  const { deal, refetchDeal } = useDeal()
  const { approve } = useApprove()

  const { user } = useUser()

  const { signTransaction } = useWallet()

  const solanaSign = async (transaction: string) => {
    if (!signTransaction || !deal) {
      return
    }

    const buffer = Buffer.from(transaction, 'base64')

    const unsignedTransaction = Transaction.from(buffer)

    const signedTransaction = await signTransaction(unsignedTransaction)

    const signatures = signedTransaction.signatures
    const signature = signatures.find(
      signature => signature.publicKey.toString() === user?.publicKey
    )

    if (!signature?.signature) {
      return
    }

    const base64Buffer = Buffer.from(signature.signature)

    const base64 = base64Buffer.toString('base64')

    await api.deals.txSignCreate(deal.id, 'DEAL_INIT', {
      signature: base64,
      transaction: transaction
    })
  }

  const evmSign = async (transaction: string, dealId: string) => {
    await approve()

    const walletClient = await getWalletClient()

    const messageToSign = toBytes(transaction)

    if (walletClient) {
      const signature = await walletClient.signMessage({
        message: { raw: messageToSign }
      })

      await api.deals.txSignCreate(dealId, 'DEAL_INIT', {
        signature,
        transaction: transaction
      })
    } else {
      throw new Error('Error on getting wallet client for sign transaction')
    }
  }

  const handleSign = async () => {
    if (!deal) {
      throw new Error(ERRORS.DEAL_EXISTS)
    }

    const { data: tx } = await httpClient<Tx>({
      url: `deals/${deal.id}/tx/DEAL_INIT?silent=0`,
      method: 'GET'
    })

    if (!tx.transaction) {
      throw new Error('No hash transaction')
    }

    switch (user?.blockchain) {
      case 'bsc': {
        await evmSign(tx.transaction, deal.id)
        break
      }

      case 'solana': {
        await solanaSign(tx.transaction)
        break
      }
    }

    await refetchDeal()
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
