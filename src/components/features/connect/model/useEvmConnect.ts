import { setCookie } from 'cookies-next'
import { bscTestnet } from 'viem/chains'
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi'
import { getAccount, signMessage } from 'wagmi/actions'

import { useUser } from '@/api/hooks/useUser'
import { COOKIES } from '@/app/constants/cookies'
import { LOCAL_STORAGE } from '@/app/constants/localStorage'
import MESSAGES from '@/app/constants/web3'
import { useUserStore } from '@/app/store/user-store'
import { generateBase64Token } from '@/lib/utils'

export const useEvmConnect = () => {
  const { connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { logout } = useUserStore()
  const { isConnected } = useAccount()
  const { refetchUser } = useUser()

  const handleConnect = async (connector: Connector) => {
    !isConnected && (await connectAsync({ connector, chainId: bscTestnet.id }))
    const signature = await signMessage({ message: MESSAGES.SIGN_MESSAGE })
    const account = getAccount()
    const deviceId = localStorage.getItem(LOCAL_STORAGE.DEVICE_ID)

    if (!account.address || !deviceId) {
      return
    }

    const token = generateBase64Token({
      type: 'BROWSER',
      blockchain: 'bsc',
      pubKey: account.address,
      signature,
      identifier: deviceId
    })
    setCookie(COOKIES.AUTH_TOKEN, token)
    await refetchUser()
  }

  const handleDisconnect = async () => {
    try {
      await disconnectAsync()
      logout()
    } catch (error) {
      console.log({ error })
    }
  }

  return { handleConnect, handleDisconnect }
}
