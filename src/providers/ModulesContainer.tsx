import { FC, ReactNode } from 'react'
import { Tooltip } from 'react-tooltip'

import { MESSAGES } from '@/app/constants/messages'
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
    <>
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

      <Tooltip
        content={MESSAGES.ONLY_CLIENT}
        id="only-client"
        style={{ zIndex: 999 }}
      />

      <Tooltip
        content={MESSAGES.ONLY_CLIENT_CHECKER}
        id="only-client-checker"
        style={{ zIndex: 999 }}
      />

      <Tooltip
        content={MESSAGES.ONLY_OWNER}
        id="only-owner"
        style={{ zIndex: 999 }}
      />
    </>
  )
}

export default ModulesContainer
