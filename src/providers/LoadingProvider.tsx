import { useAutoAnimate } from '@formkit/auto-animate/react'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'

import { useBalance } from '@/api/hooks/useBalance'
import { useDeal } from '@/api/hooks/useDeal'
import { useDealActions } from '@/api/hooks/useDealActions'
import { useDeals } from '@/api/hooks/useDeals'
import { useStatistics } from '@/api/hooks/useStatistics'
import { useTokens } from '@/api/hooks/useTokens'
import { useUser } from '@/api/hooks/useUser'
import { LogoScreen } from '@/components/features/connect/ui/LogoScreen'

export const LoadingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isUserLoading } = useUser()
  const { isTokensLoading } = useTokens()
  const { isStatisticsLoading } = useStatistics()
  const { isBalanceLoading } = useBalance()
  const { isDealLoading } = useDeal()
  const { isDealsLoading } = useDeals()
  const { isActionsLoading } = useDealActions()

  const [mounted, setMounted] = useState(false)
  const [parent] = useAutoAnimate()
  useEffect(() => {
    setMounted(true)
  }, [mounted])

  const isAppLoading = useMemo(() => {
    return (
      mounted &&
      (isUserLoading ||
        isTokensLoading ||
        isStatisticsLoading ||
        isBalanceLoading ||
        isDealLoading ||
        isDealsLoading ||
        isActionsLoading)
    )
  }, [
    mounted,
    isUserLoading,
    isTokensLoading,
    isStatisticsLoading,
    isBalanceLoading
  ])

  return <div ref={parent}>{isAppLoading ? <LogoScreen /> : children}</div>
}
