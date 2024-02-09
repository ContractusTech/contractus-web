import { FC, ReactNode } from 'react'

import { ConnectProvider } from '@/components/features/connect'
import { ConnectorContextProvider } from '@/components/features/connector'
import { DeviceIdProvider } from '@/components/features/deviceId'
import { WagmiProvider } from '@/components/features/wagmi-provider'
import { BalanceProvider } from '@/providers/BalanceProvider'
import { LoadingProvider } from '@/providers/LoadingProvider'

type Props = {
  children?: ReactNode
}
const ModulesContainer: FC<Props> = ({ children }) => {
  return (
    <ConnectorContextProvider>
      <WagmiProvider>
        <LoadingProvider>
          <ConnectProvider>
            <DeviceIdProvider>
              <BalanceProvider>{children}</BalanceProvider>
            </DeviceIdProvider>
          </ConnectProvider>
        </LoadingProvider>
      </WagmiProvider>
    </ConnectorContextProvider>
  )
}

export default ModulesContainer
