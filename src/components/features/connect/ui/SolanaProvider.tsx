import { WalletName } from '@solana/wallet-adapter-base'
import { useWallet } from '@solana/wallet-adapter-react'
import { useQueryClient } from '@tanstack/react-query'
import base58 from 'bs58'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect
} from 'react'

import { useUser } from '@/api/hooks/useUser'
import { LOCAL_STORAGE } from '@/app/constants/localStorage'
import MESSAGES from '@/app/constants/web3'
import { useUserStore } from '@/app/store/user-store'
import { generateBase64Token } from '@/lib/utils'

const SolanaConnectContext = createContext<any>(null)

export const useSolanaConnect = () => {
  const context = useContext(SolanaConnectContext)
  if (!context) {
    throw new Error(
      'useSolanaConnectContext must be used within a SolanaConnectProvider'
    )
  }
  return context
}

export const SolanaConnectProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const queryClient = useQueryClient()
  const {
    select,
    signMessage,
    disconnect,
    publicKey,
    wallet,
    connected,
    disconnecting
  } = useWallet()
  const { logout } = useUserStore()
  const { user, refetchUser } = useUser()

  useEffect(() => {
    const connectAndSign = async () => {
      if (!wallet || !signMessage || !publicKey) {
        return
      }

      const deviceId = localStorage.getItem(LOCAL_STORAGE.DEVICE_ID)
      if (!deviceId) {
        return
      }

      if (user) {
        return
      }

      const message = new TextEncoder().encode(MESSAGES.SIGN_MESSAGE)

      if (disconnecting) {
        return
      }

      const signature = await signMessage(message)

      generateBase64Token({
        type: 'BROWSER',
        blockchain: 'solana',
        pubKey: publicKey.toBase58(),
        signature: base58.encode(signature),
        identifier: deviceId
      })

      refetchUser()
    }

    connectAndSign()
  }, [wallet, signMessage, publicKey, connected, disconnecting, queryClient])

  const handleConnect = (selectedWallet: WalletName) => {
    if (!connected) {
      select(selectedWallet)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
      logout()
    } catch (error) {
      console.log({ e: error })
    }
  }

  const value = {
    handleConnect,
    handleDisconnect
  }

  return (
    <SolanaConnectContext.Provider value={value}>
      {children}
    </SolanaConnectContext.Provider>
  )
}
