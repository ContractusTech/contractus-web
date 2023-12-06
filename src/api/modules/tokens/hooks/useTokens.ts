import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { COOKIES } from '@/app/constants/cookies'

import { TokensService } from '../tokens.service'

export const TOKENS_UQ_KEY = 'tokens'

export const useTokens = () => {
  const { data: tokens, isLoading: isTokensLoading } = useQuery({
    queryKey: [TOKENS_UQ_KEY],
    queryFn: () => TokensService.getTokens(),
    enabled: !!getCookie(COOKIES.AUTH_TOKEN)
  })

  return {
    tokens,
    isTokensLoading
  }
}
