import { FC, ReactNode } from 'react'

import { BalanceProvider } from '@/providers/BalanceProvider'
import { EthereumProvider } from '@/providers/EthereumProvider'
import { LoadingProvider } from '@/providers/LoadingProvider'
import { WagmiProvider } from '@/providers/WagmiProvider'

import { ConnectProvider } from './ConnectProvider'
import { DeviceIdProvider } from './DeviceIdProvider'
import { SolanaWalletAdapter } from './SolanaWalletAdapter'

type Props = {
  children?: ReactNode
}
const ModulesContainer: FC<Props> = ({ children }) => {
  return (
    <SolanaWalletAdapter>
      <WagmiProvider>
        <EthereumProvider>
          <LoadingProvider>
            <ConnectProvider>
              <DeviceIdProvider>
                <BalanceProvider>{children}</BalanceProvider>
              </DeviceIdProvider>
            </ConnectProvider>
          </LoadingProvider>
        </EthereumProvider>
      </WagmiProvider>
    </SolanaWalletAdapter>
  )
}

export default ModulesContainer
