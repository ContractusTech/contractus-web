import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { api } from '@/api/client'
import { COOKIES } from '@/app/constants/cookies'

export const DEALS_UQ_KEY = 'deals'
export const DEAL_UQ_KEY = 'deal'

export const useDeals = () => {
  const {
    data: deals,
    isLoading: isDealsLoading,
    refetch
  } = useQuery({
    queryKey: [DEALS_UQ_KEY],
    queryFn: () => api.deals.dealsList(),
    enabled: !!getCookie(COOKIES.AUTH_TOKEN)
  })

  return {
    deals,
    isDealsLoading,
    refetch
  }
}

export const useDeal = (dealId: string) => {
  const {
    data: deal,
    isLoading: isDealLoading,
    refetch
  } = useQuery({
    queryKey: [DEAL_UQ_KEY],
    queryFn: () =>
      api.deals.dealsDetail(dealId, {
        baseURL: process.env.NEXT_PUBLIC_API_HOST
      }),
    enabled: !!getCookie(COOKIES.AUTH_TOKEN)
  })

  return {
    deal,
    isDealLoading,
    refetch
  }
}
