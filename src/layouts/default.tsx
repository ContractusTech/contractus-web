import { Footer } from '@/components/widgets/footer'
import { Header } from '@/components/widgets/header'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col px-24">
      <Header />

      <div className="mx-auto flex w-full max-w-[540px] flex-grow flex-col border-t-[1px] border-border pt-12">
        {children}
      </div>

      <Footer />
    </main>
  )
}
