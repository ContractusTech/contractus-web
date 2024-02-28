import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useParams } from 'next/navigation'

import { COOKIES } from '@/app/constants/cookies'

import httpClient from '../httpClient'

const FUNDS_UQ_KEY = 'funds'

export const useCheckFunds = () => {
  const params = useParams<{ id: string }>()

  const { data: neededFounds, isLoading: isFoundsLoading } = useQuery({
    queryKey: [FUNDS_UQ_KEY, params?.id],
    enabled: !!getCookie(COOKIES.AUTH_TOKEN) && !!params?.id,
    queryFn: () =>
      httpClient({
        url: `deals/${params?.id}/check-funds`,
        method: 'GET'
      }).then(({ data }) => data)
  })

  return {
    neededFounds,
    isFoundsLoading
  }
}
