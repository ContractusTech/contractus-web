import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { COOKIES } from '@/app/constants/cookies'

import { AccountsService } from '../accounts.service'
import { BalanceRequestType, BalanceType } from '../accounts.types'

export const BALANCE_UQ_KEY = 'balance'

const getStatisticsQuery = (
  dto: BalanceRequestType
): UseQueryOptions<BalanceType> => ({
  queryKey: [
    BALANCE_UQ_KEY,
    dto.tokens.reduce((acc, item) => `${acc}-${item}`, '')
  ],
  queryFn: () => AccountsService.getBalance(dto)
})

export const useBalance = (dto: BalanceRequestType) => {
  const { data: balance, isLoading: isBalanceLoading } = useQuery({
    ...getStatisticsQuery(dto),
    enabled: !!getCookie(COOKIES.AUTH_TOKEN)
  })

  return {
    balance,
    isBalanceLoading
  }
}
