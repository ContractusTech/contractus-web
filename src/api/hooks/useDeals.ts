import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { api } from '@/api/client'
import { COOKIES } from '@/app/constants/cookies'
import { Deal } from '@/app/types'

export const DEALS_UQ_KEY = 'deals'

export const useDeals = () => {
  const {
    data: deals,
    isLoading: isDealsLoading,
    refetch: refetchDeals
  } = useQuery({
    queryKey: [DEALS_UQ_KEY],
    queryFn: () => api.deals.dealsList() as unknown as Deal[],
    enabled: !!getCookie(COOKIES.AUTH_TOKEN),
    refetchInterval: 10_000
  })

  return {
    deals,
    isDealsLoading,
    refetchDeals
  }
}
