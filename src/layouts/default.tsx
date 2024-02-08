import { useTokens } from '@/api/modules/tokens/hooks/useTokens'
import { Footer } from '@/components/widgets/footer'
import { Header } from '@/components/widgets/header'
import { BalanceProvider } from '@/providers/BalanceProvider'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { isTokensLoading } = useTokens()

  if (isTokensLoading) {
    return <span>Loading</span>
  }

  return (
    <BalanceProvider>
      <main className="flex min-h-screen flex-col px-24">
        <Header />

        <div className="mx-auto flex w-full max-w-[540px] flex-grow flex-col border-t-[1px] border-border pt-20">
          {children}
        </div>

        <Footer />
      </main>
    </BalanceProvider>
  )
}
