import { parseUnits } from 'viem'

import { api } from '@/api/client'
import { useDeal } from '@/api/hooks/useDeal'
import { useTokens } from '@/api/hooks/useTokens'
import { useRolesStore } from '@/app/store/roles-store'
import { Amount } from '@/app/types'
import { getDecimalOfShortToken } from '@/lib/utils'

import { AmountChoice } from './AmountChoice'

export const DealAmountChange = () => {
  const { deal, refetchDeal } = useDeal()

  const { tokens } = useTokens()

  const { iClient } = useRolesStore()

  if (!deal) {
    return null
  }

  const handleSaveAmountOfDeal = async (amount: Amount) => {
    if (!tokens) {
      throw new Error('Tokens is unavaliable')
    }

    const decimalAmount = parseUnits(
      amount.value,
      getDecimalOfShortToken(amount.token, tokens)
    ).toString()

    await api.deals.dealsCreate2(deal.id, {
      amount: { value: decimalAmount, token: amount.token }
    })

    await refetchDeal()
  }

  return (
    <AmountChoice
      defaultAmount={{
        token: { address: deal.token.address, code: deal.token.code },
        value: deal.amount
      }}
      onSelect={handleSaveAmountOfDeal}
      feeDealid={deal.id}
      withFee
      disabled={!iClient}
    />
  )
}
