import Cookies from 'js-cookie'
import { bsc } from 'viem/chains'
import { Connector, useConnect } from 'wagmi'
import { getAccount, signMessage } from 'wagmi/actions'

import { api } from '@/api/client'
import { COOKIES } from '@/app/constants/cookies'
import { LOCAL_STORAGE } from '@/app/constants/localStorage'
import MESSAGES from '@/app/constants/web3'
import { useUserStore } from '@/app/store/user-store'
import { generateBase64Token } from '@/lib/utils'

export const useEvmConnect = () => {
  const { connectAsync } = useConnect()
  const { setConnectedUser } = useUserStore()

  const handleConnect = async (connector: Connector) => {
    await connectAsync({ connector, chainId: bsc.id })
    const signature = await signMessage({ message: MESSAGES.SIGN_MESSAGE })
    const account = getAccount()
    const deviceId = localStorage.getItem(LOCAL_STORAGE.DEVICE_ID)

    if (!account.address || !deviceId) {
      return
    }

    generateBase64Token({
      type: 'BROWSER',
      blockchain: 'bsc',
      pubKey: account.address,
      signature,
      identifier: deviceId
    })

    const token = Cookies.get(COOKIES.AUTH_TOKEN)

    const accountFromApi = await api.accounts.getAccounts({
      headers: { 'X-Authorization': token }
    })
    setConnectedUser(accountFromApi)
  }

  return { handleConnect }
}
