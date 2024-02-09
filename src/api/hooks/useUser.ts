import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { COOKIES } from '@/app/constants/cookies'

import { api } from '../client'
import { Account } from '../generated-api'

export const USER_UQ_KEY = 'user'

export const useUser = () => {
  const {
    isLoading: isUserLoading,
    refetch: refetchUser,
    data: user
  } = useQuery<Account>({
    queryKey: [USER_UQ_KEY],
    enabled: !!getCookie(COOKIES.AUTH_TOKEN),
    queryFn: () => api.accounts.getAccounts()
  })

  return { isUserLoading, refetchUser, user }
}
