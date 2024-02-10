import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { COOKIES } from '@/app/constants/cookies'
import { useSelectedTokensStore } from '@/app/store/selectedTokensStore'
import { BalanceType } from '@/app/types'

import { api } from '../client'

const BALANCE_UQ_KEY = 'balance'

export const useBalance = () => {
  const { selectedTokens } = useSelectedTokensStore()

  const { data: balance, isLoading } = useQuery({
    queryKey: [BALANCE_UQ_KEY, selectedTokens],
    queryFn: () =>
      api.accounts.balanceCreate({
        currency: 'USD',
        tokens: selectedTokens
          .filter(selectedToken => !!selectedToken.checked)
          .map(selectedToken => ({
            code: selectedToken.code,
            address: selectedToken.address
          }))
      }) as unknown as BalanceType,
    enabled: !!getCookie(COOKIES.AUTH_TOKEN)
  })

  return { balance, isBalanceLoading: isLoading }
}
