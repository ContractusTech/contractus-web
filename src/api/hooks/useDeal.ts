import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useParams } from 'next/navigation'

import { COOKIES } from '@/app/constants/cookies'
import { Deal } from '@/app/types'

import { api } from '../client'

const DEAL_UQ_KEY = 'deal'

export const useDeal = () => {
  const params = useParams<{ id: string }>()

  const {
    data: deal,
    isLoading: isDealLoading,
    refetch: refetchDeal
  } = useQuery({
    queryKey: [DEAL_UQ_KEY, params?.id],
    enabled: !!params?.id && !!getCookie(COOKIES.AUTH_TOKEN),
    refetchInterval: 10_000,
    queryFn: () => {
      if (!params?.id) {
        throw new Error('No id of deal!')
      }

      return api.deals.dealsDetail(params.id) as unknown as Deal
    }
  })

  return { deal, isDealLoading, refetchDeal }
}
