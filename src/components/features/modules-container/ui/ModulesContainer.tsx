import { FC, ReactNode } from 'react'

import { ConnectProvider } from '@/components/features/connect'
import { ConnectorContextProvider } from '@/components/features/connector'
import { DeviceIdProvider } from '@/components/features/deviceId'
import { WagmiProvider } from '@/components/features/wagmi-provider'

type Props = {
  children?: ReactNode
}
const ModulesContainer: FC<Props> = ({ children }) => {
  return (
    <ConnectorContextProvider>
      <WagmiProvider>
        <ConnectProvider>
          <DeviceIdProvider>{children}</DeviceIdProvider>
        </ConnectProvider>
      </WagmiProvider>
    </ConnectorContextProvider>
  )
}

export default ModulesContainer
