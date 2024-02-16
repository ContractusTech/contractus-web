import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { COOKIES } from '@/app/constants/cookies'

import { api } from '../client'

const PROMPTS_UQ_KEY = 'prompts'

export const usePrompts = () => {
  const { data: prompts, isLoading: isPromptsLoading } = useQuery({
    queryKey: [PROMPTS_UQ_KEY],
    enabled: !!getCookie(COOKIES.AUTH_TOKEN),
    queryFn: () => api.ai.promptsList()
  })

  return { prompts, isPromptsLoading }
}
