import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { api } from '@/api/client'
import { COOKIES } from '@/app/constants/cookies'

export const DEALS_UQ_KEY = 'deals'

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
