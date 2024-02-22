import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { useUser } from '@/api/hooks/useUser'
import { useLogout } from '@/hooks/useLogout'

import { ConnectOverflow } from './ConnectOverflow'
import { SolanaConnectProvider } from './SolanaProvider'

export const ConnectProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser()
  const [parent] = useAutoAnimate()
  const { logout } = useLogout()
  const { isConnected } = useAccount()

  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (user && user.blockchain === 'bsc' && !isConnected) {
      logout()
    }
  }, [user])

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
