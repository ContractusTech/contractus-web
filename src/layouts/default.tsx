import { ConnectProvider } from '@/components/features/connect'
import { ConnectorContextProvider } from '@/components/features/connector'
import { DeviceIdProvider } from '@/components/features/deviceId'
import { WagmiProvider } from '@/components/features/wagmi-provider'
import { Header } from '@/components/widgets/header'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ConnectorContextProvider>
      <WagmiProvider>
        <ConnectProvider>
          <DeviceIdProvider>
            <main className="flex min-h-screen flex-col px-24 pb-35">
              <Header />

              <div className="mx-auto flex w-full max-w-[500px] flex-grow flex-col border-t-[1px] border-border pt-20">
                {children}
              </div>
            </main>
          </DeviceIdProvider>
        </ConnectProvider>
      </WagmiProvider>
    </ConnectorContextProvider>
  )
}
