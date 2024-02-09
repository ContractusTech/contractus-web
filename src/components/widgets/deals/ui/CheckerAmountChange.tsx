import { parseUnits } from 'viem'

import { api } from '@/api/client'
import { useDeal } from '@/api/hooks/useDeal'
import { useTokens } from '@/api/hooks/useTokens'
import { Amount } from '@/app/types'
import { getDecimalOfShortToken } from '@/lib/utils'

import { AmountChoice } from './AmountChoice'

export const CheckerAmountChange = () => {
  const { deal, refetchDeal } = useDeal()
  const { tokens } = useTokens()

  if (!deal) {
    throw new Error('No deal')
  }

  if (!tokens) {
    throw new Error('No tokens')
  }

  const handleSaveCheckerAmount = async (amount: Amount) => {
    const decimalAmount = parseUnits(
      amount.value,
      getDecimalOfShortToken(amount.token, tokens)
    ).toString()

    await api.deals.dealsCreate2(deal.id, {
      checkerAmount: {
        value: decimalAmount,
        token: amount.token
      }
    })

    await refetchDeal()
  }

  const defaultValueChecker: Amount | undefined = deal.checkerToken
    ? {
        token: {
          address: deal.checkerToken?.address,
          code: deal.checkerToken?.code
        },
        value: deal.checkerAmount ?? '0'
      }
    : undefined

  return (
    <AmountChoice
      dealAmount={deal.amount}
      feeDealid={deal.id}
      onSelect={handleSaveCheckerAmount}
      defaultAmount={defaultValueChecker}
      withFee
      checker
      dealToken={deal.token}
    />
  )
}
