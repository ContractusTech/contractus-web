import { PropsWithChildren } from 'react'

import { useTokens } from '@/api/modules/tokens/hooks/useTokens'

export const Loading: React.FC<PropsWithChildren> = ({ children }) => {
  const { isTokensLoading } = useTokens()

  return <div>{isTokensLoading ? <span>Loading</span> : children}</div>
}
