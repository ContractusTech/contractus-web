import { WalletName } from '@solana/wallet-adapter-base'
import { useWallet } from '@solana/wallet-adapter-react'
import bs58 from 'bs58'
import { getCookie } from 'cookies-next'
// import Cookies from 'js-cookie'
import { useEffect } from 'react'

import { api } from '@/api/client'
import { COOKIES } from '@/app/constants/cookies'
import { LOCAL_STORAGE } from '@/app/constants/localStorage'
import MESSAGES from '@/app/constants/web3'
import { useUserStore } from '@/app/store/user-store'
import { generateBase64Token } from '@/lib/utils'

export const useSolanaConnect = () => {
  const { select, signMessage, publicKey, wallet, connected, disconnect } =
    useWallet()
  const { connectedUser, setConnectedUser, logout } = useUserStore()

  useEffect(() => {
    const connectAndSign = async () => {
      if (!wallet || !signMessage || !publicKey) {
        return
      }

      const deviceId = localStorage.getItem(LOCAL_STORAGE.DEVICE_ID)
      if (!deviceId) {
        return
      }

      if (connectedUser) {
        return
      }

      const message = new TextEncoder().encode(MESSAGES.SIGN_MESSAGE)
      const signature = await signMessage(message)

      bs58.encode(signature)

      generateBase64Token({
        type: 'BROWSER',
        blockchain: 'solana',
        pubKey: publicKey.toBase58(),
        signature: bs58.encode(signature),
        identifier: deviceId
      })

      const token = getCookie(COOKIES.AUTH_TOKEN)

      const account = await api.accounts.getAccounts({
        headers: { 'X-Authorization': token }
      })
      setConnectedUser(account)
    }

    connectAndSign()
  }, [wallet, signMessage, publicKey, connectedUser])

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

  return { handleConnect, handleDisconnect }
}
