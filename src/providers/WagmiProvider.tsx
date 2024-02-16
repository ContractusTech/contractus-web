import { PropsWithChildren } from 'react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'

import { MESSAGES } from '@/app/constants/web3'

export const WagmiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { publicClient, webSocketPublicClient } = configureChains(
    [bscTestnet],
    [publicProvider()]
  )

  const MetamaskConnector = new MetaMaskConnector()
  const wcConnector = new WalletConnectConnector({
    options: { projectId: MESSAGES.WC_ID }
  })

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors: [MetamaskConnector, wcConnector]
  })

  return <WagmiConfig config={config}>{children}</WagmiConfig>
}
