import { WalletName } from '@solana/wallet-adapter-base'
import { useWallet } from '@solana/wallet-adapter-react'
import { Transaction } from '@solana/web3.js'
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
import { MESSAGES } from '@/app/constants/web3'
import { useLogout } from '@/hooks/useLogout'
import { generateBase64Token } from '@/lib/utils'

type SolanaConnectContextType = {
  signTransactionBase64: (transaction: string) => Promise<string>
  handleConnect: (wallet: WalletName) => void
  handleDisconnect: () => Promise<void>
}

const SolanaConnectContext = createContext<SolanaConnectContextType>({
  signTransactionBase64: async () => '',
  handleConnect: async () => undefined,
  handleDisconnect: async () => undefined
})

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

  const { signTransaction } = useWallet()

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

  const signTransactionBase64 = async (transaction: string) => {
    if (!signTransaction) {
      throw new Error('Method is unavaliable')
    }

    const buffer = Buffer.from(transaction, 'base64')

    const unsignedTransaction = Transaction.from(buffer)

    const signedTransaction = await signTransaction(unsignedTransaction)

    const signatures = signedTransaction.signatures
    const signature = signatures.find(
      signature => signature.publicKey.toString() === user?.publicKey
    )

    if (!signature?.signature) {
      throw new Error('Error on get signature from signed transaction')
    }

    const base64Buffer = Buffer.from(signature.signature)

    const base64 = base64Buffer.toString('base64')

    return base64
  }

  return (
    <SolanaConnectContext.Provider
      value={{ handleConnect, handleDisconnect, signTransactionBase64 }}
    >
      {children}
    </SolanaConnectContext.Provider>
  )
}
