import { parseUnits } from 'viem'

import { api } from '@/api/client'
import { useTokens } from '@/api/modules/tokens/hooks/useTokens'
import { useDealStore } from '@/app/store/deal-store'
import { Amount } from '@/app/types'
import { getDecimalOfShortToken } from '@/lib/utils'

import { AmountChoice } from './AmountChoice'

export const BondAmountChange = ({
  type
}: {
  type: 'owner' | 'contractor'
}) => {
  const { updateDeal, deal } = useDealStore()
  const { tokens } = useTokens()

  if (!deal) {
    throw new Error('No deal')
  }

  if (!tokens) {
    throw new Error('No tokens')
  }

  const handleAmountSettingsSave = async (amount: Amount) => {
    try {
      const decimalAmount = parseUnits(
        amount.value,
        getDecimalOfShortToken(amount.token, tokens)
      ).toString()

      await api.deals.dealsCreate2(deal.id, {
        [`${type}BondAmount`]: {
          value: decimalAmount,
          token: amount.token
        }
      })

      await updateDeal()
    } catch (error) {
      console.log(error)
    }
  }

  // @ts-ignore
  const defaultValue: Amount | undefined = deal[`${type}BondToken`]
    ? {
        token: {
          address: deal[`${type}BondToken`]?.address,
          code: deal[`${type}BondToken`]?.code
        },
        value: deal[`${type}BondAmount`] ?? '0'
      }
    : undefined

  return (
    <AmountChoice
      onSelect={handleAmountSettingsSave}
      defaultAmount={defaultValue}
    />
  )
}
