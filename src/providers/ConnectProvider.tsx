import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { useUser } from '@/api/hooks/useUser'

import { ConnectOverflow } from './ConnectOverflow'
import { SolanaConnectProvider } from './SolanaProvider'

export const ConnectProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser()
  const [parent] = useAutoAnimate()

  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <SolanaConnectProvider>
      {children}
      <div ref={parent}>{!user && <ConnectOverflow />}</div>
    </SolanaConnectProvider>
  )
}
