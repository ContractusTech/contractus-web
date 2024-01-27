import {
  keepPreviousData,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { api } from '@/api/client'
import { COOKIES } from '@/app/constants/cookies'

import { BalanceRequestType, BalanceType } from '../accounts.types'

export const BALANCE_UQ_KEY = 'balance'

const getStatisticsQuery = (
  dto: BalanceRequestType
): UseQueryOptions<BalanceType> => ({
  queryKey: [BALANCE_UQ_KEY, dto],
  queryFn: () =>
    api.accounts.balanceCreate(dto).then(data => data as unknown as BalanceType)
})

export const useBalance = (dto: BalanceRequestType) => {
  const { data: balance, isLoading: isBalanceLoading } = useQuery({
    ...getStatisticsQuery(dto),
    enabled: !!getCookie(COOKIES.AUTH_TOKEN),
    placeholderData: keepPreviousData
  })

  return {
    balance,
    isBalanceLoading
  }
}
