import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { api } from '@/api/client'
import { COOKIES } from '@/app/constants/cookies'
import { Deal, DealStatus } from '@/app/types'

export const DEALS_UQ_KEY = 'deals'

export const useDeals = (dto?: { statuses?: DealStatus[] }) => {
  const {
    data: deals,
    isLoading: isDealsLoading,
    refetch: refetchDeals
  } = useQuery({
    queryKey: [DEALS_UQ_KEY, dto?.statuses],
    queryFn: () =>
      api.deals.dealsList({ 'statuses[]': dto?.statuses }) as unknown as Deal[],
    enabled: !!getCookie(COOKIES.AUTH_TOKEN),
    refetchInterval: 10_000
  })

  return {
    deals,
    isDealsLoading,
    refetchDeals
  }
}
