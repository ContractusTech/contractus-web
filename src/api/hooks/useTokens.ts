import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { COOKIES } from '@/app/constants/cookies'
import { Token } from '@/app/types'

import { api } from '../client'

export const TOKENS_UQ_KEY = 'tokens'

export const useTokens = () => {
  const { data: tokens, isLoading: isTokensLoading } = useQuery({
    queryKey: [TOKENS_UQ_KEY],
    queryFn: () =>
      api.resources.tokensList({ type: 'full' }) as unknown as Token[],
    enabled: !!getCookie(COOKIES.AUTH_TOKEN)
  })

  return {
    tokens,
    isTokensLoading
  }
}
