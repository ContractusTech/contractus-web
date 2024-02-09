import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useParams } from 'next/navigation'

import { COOKIES } from '@/app/constants/cookies'

import { api } from '../client'
import { DealActions } from '../generated-api'

const ACTIONS_UQ_KEY = 'actions'

export const useDealActions = () => {
  const params = useParams<{ id: string }>()

  const {
    data: actions,
    isLoading: isActionsLoading,
    refetch: refetchActions
  } = useQuery({
    queryKey: [ACTIONS_UQ_KEY],
    enabled: !!params?.id && !!getCookie(COOKIES.AUTH_TOKEN),
    queryFn: () => {
      if (!params?.id) {
        throw new Error('No id of deal!')
      }

      return api.deals.actionsDetail(params.id) as unknown as DealActions
    }
  })

  return { actions, isActionsLoading, refetchActions }
}
