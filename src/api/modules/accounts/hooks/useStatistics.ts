import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

import { COOKIES } from '@/app/constants/cookies'

import { AccountsService } from '../accounts.service'

export const STATISTICS_UQ_KEY = 'statistics'

export const useStatistics = () => {
  const { data: statistics, isLoading: isStatisticsLoading } = useQuery({
    queryKey: [STATISTICS_UQ_KEY],
    queryFn: () => AccountsService.getStatistics(),
    enabled: !!getCookie(COOKIES.AUTH_TOKEN)
  })

  return {
    statistics,
    isStatisticsLoading
  }
}
