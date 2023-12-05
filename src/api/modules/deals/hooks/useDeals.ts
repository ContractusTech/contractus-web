import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { COOKIES } from '@/app/constants/cookies'

import { DealsService } from '../deals.service'

export const DEALS_UQ_KEY = 'deals'

export const useDeals = () => {
  const { data: deals, isLoading: isDealsLoading } = useQuery({
    queryKey: [DEALS_UQ_KEY],
    queryFn: () => DealsService.getDeals(),
    enabled: !!getCookie(COOKIES.AUTH_TOKEN)
  })

  return {
    deals,
    isDealsLoading
  }
}
