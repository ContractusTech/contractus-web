import { parseUnits } from 'viem'

import { api } from '@/api/client'
import { useDeal } from '@/api/hooks/useDeal'
import { useTokens } from '@/api/hooks/useTokens'
import { PROMPTS } from '@/app/constants/prompts'
import { useRolesStore } from '@/app/store/roles-store'
import { Amount } from '@/app/types'
import { getDecimalOfShortToken } from '@/lib/utils'
import { useCustomPrompt } from '@/providers/DealChangeAlert'

import { AmountChoice } from './AmountChoice'

export const BondAmountChange = ({
  type
}: {
  type: 'owner' | 'contractor'
}) => {
  const { refetchDeal, deal } = useDeal()
  const { tokens } = useTokens()
  const { signedByChecker, signedByClient, signedByExecutor } = useRolesStore()
  const { requestPrompt } = useCustomPrompt()

  if (!deal) {
    throw new Error('No deal')
  }

  if (!tokens) {
    throw new Error('No tokens')
  }

  const handleAmountSettingsSave = async (amount: Amount) => {
    try {
      if ([signedByChecker, signedByClient, signedByExecutor].includes(true)) {
        const res = await requestPrompt(PROMPTS.CONFIGN_UNSIGN)

        if (!res) {
          return
        }
      }

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

      await refetchDeal()
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
