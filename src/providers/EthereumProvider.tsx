import { setCookie } from 'cookies-next'
import { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import { Connector, ConnectorData, useAccount, useDisconnect } from 'wagmi'
import { connect, getAccount, signMessage } from 'wagmi/actions'

import { useUser } from '@/api/hooks/useUser'
import { COOKIES } from '@/app/constants/cookies'
import { LOCAL_STORAGE } from '@/app/constants/localStorage'
import { MESSAGES } from '@/app/constants/web3'
import { useLogout } from '@/hooks/useLogout'
import { generateBase64Token } from '@/lib/utils'

type EthereumContextType = {
  handleConnect: (connector: Connector) => Promise<void>
  handleDisconnect: () => void
}

const EthereumContext = createContext<EthereumContextType>({
  handleConnect: async () => undefined,
  handleDisconnect: async () => undefined
})

export const EthereumProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { disconnectAsync } = useDisconnect()
  const { refetchUser } = useUser()
  const { logout } = useLogout()

  const { isConnected } = useAccount()
  const { connector: activeConnector } = useAccount()

  const handleConnect = async (connector: Connector) => {
    !isConnected && (await connect({ connector }))
    const signature = await signMessage({ message: MESSAGES.SIGN_MESSAGE })
    const { address } = getAccount()
    const deviceId = localStorage.getItem(LOCAL_STORAGE.DEVICE_ID)

    if (!address || !deviceId) {
      return
    }

    const token = generateBase64Token({
      type: 'BROWSER',
      blockchain: 'bsc',
      pubKey: address,
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

  useEffect(() => {
    const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
      if (account) {
        handleDisconnect()
      } else if (chain) {
        handleDisconnect()
      }
    }

    if (activeConnector) {
      activeConnector.on('change', handleConnectorUpdate)
    }

    return () => {
      activeConnector?.off('change', handleConnectorUpdate)
    }
  }, [activeConnector])

  return (
    <EthereumContext.Provider value={{ handleConnect, handleDisconnect }}>
      {children}
    </EthereumContext.Provider>
  )
}

export const useEthereum = () => useContext(EthereumContext)
