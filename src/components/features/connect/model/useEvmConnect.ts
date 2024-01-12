import { useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
// import Cookies from 'js-cookie'
import { bsc } from 'viem/chains'
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi'
import { getAccount, signMessage } from 'wagmi/actions'

import { api } from '@/api/client'
import { STATISTICS_UQ_KEY } from '@/api/modules/accounts/hooks/useStatistics'
import { DEALS_UQ_KEY } from '@/api/modules/deals/hooks/useDeals'
import { TOKENS_UQ_KEY } from '@/api/modules/tokens/hooks/useTokens'
import { COOKIES } from '@/app/constants/cookies'
import { LOCAL_STORAGE } from '@/app/constants/localStorage'
import MESSAGES from '@/app/constants/web3'
import { useUserStore } from '@/app/store/user-store'
import { generateBase64Token } from '@/lib/utils'

export const useEvmConnect = () => {
  const queryClient = useQueryClient()
  const { connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { setConnectedUser, logout } = useUserStore()
  const { isConnected } = useAccount()
  const handleConnect = async (connector: Connector) => {
    !isConnected && (await connectAsync({ connector, chainId: bsc.id }))
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

    const token = getCookie(COOKIES.AUTH_TOKEN)

    const accountFromApi = await api.accounts.getAccounts({
      headers: { 'X-Authorization': token }
    })
    setConnectedUser(accountFromApi)

    queryClient.invalidateQueries({ queryKey: [TOKENS_UQ_KEY] })
    queryClient.invalidateQueries({ queryKey: [STATISTICS_UQ_KEY] })
    queryClient.invalidateQueries({ queryKey: [DEALS_UQ_KEY] })
  }

  const handleDisconnect = async () => {
    try {
      await disconnectAsync()
      logout()

      queryClient.invalidateQueries({ queryKey: [TOKENS_UQ_KEY] })
      queryClient.invalidateQueries({ queryKey: [STATISTICS_UQ_KEY] })
      queryClient.invalidateQueries({ queryKey: [DEALS_UQ_KEY] })
    } catch (error) {
      console.log({ error })
    }
  }

  return { handleConnect, handleDisconnect }
}
