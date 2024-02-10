import { WalletName } from '@solana/wallet-adapter-base'
import { useWallet } from '@solana/wallet-adapter-react'
import base58 from 'bs58'
import { setCookie } from 'cookies-next'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect
} from 'react'

import { useUser } from '@/api/hooks/useUser'
import { COOKIES } from '@/app/constants/cookies'
import { LOCAL_STORAGE } from '@/app/constants/localStorage'
import MESSAGES from '@/app/constants/web3'
import { useLogout } from '@/hooks/useLogout'
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
  const {
    select,
    signMessage,
    disconnect,
    publicKey,
    wallet,
    connected,
    disconnecting
  } = useWallet()
  const { logout } = useLogout()

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

      const token = generateBase64Token({
        type: 'BROWSER',
        blockchain: 'solana',
        pubKey: publicKey.toBase58(),
        signature: base58.encode(signature),
        identifier: deviceId
      })

      setCookie(COOKIES.AUTH_TOKEN, token)

      refetchUser()
    }

    connectAndSign()
  }, [wallet, signMessage, publicKey, connected, disconnecting])

  const handleConnect = (selectedWallet: WalletName) => {
    if (!connected) {
      console.log(1)
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
