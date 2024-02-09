import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { api } from '@/api/client'
import { COOKIES } from '@/app/constants/cookies'

export const STATISTICS_UQ_KEY = 'statistics'

export const useStatistics = () => {
  const { data: statistics, isLoading: isStatisticsLoading } = useQuery({
    queryKey: [STATISTICS_UQ_KEY],
    queryFn: () => api.accounts.statisticsList(),
    enabled: !!getCookie(COOKIES.AUTH_TOKEN)
  })

  return {
    statistics,
    isStatisticsLoading
  }
}
