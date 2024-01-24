import '@/app/plugins'

import type { Metadata } from 'next'
import type { AppProps } from 'next/app'
import { Inter, Work_Sans } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { pageTitle } from '@/app/core'
import { NextPageWithLayout } from '@/app/types'
import { ModulesContainer } from '@/components/features/modules-container'
import { ReactQueryProvider } from '@/components/features/react-query-provider'

// require('@solana/wallet-adapter-ant-design/styles.css')
require('@/assets/styles/tailwind.css')
require('@/assets/styles/custom-scrollbar.css')
require('@solana/wallet-adapter-react-ui/styles.css')

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--family-sans'
})

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--family-second'
})

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export const metadata: Metadata = {
  title: 'Contractus',
  description: ''
}

export default function CustomApp({
  Component,
  pageProps
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  const router = useRouter()
  useEffect(() => {
    router.beforePopState(state => {
      state.options.scroll = false
      return true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReactQueryProvider dehydratedState={pageProps.ssrState}>
      <ModulesContainer>
        {getLayout(
          <>
            <Head>
              <title>{pageTitle()}</title>
              <link rel="icon" type="image/svg+xml" href="/logo.svg" />
            </Head>

            <ReactQueryProvider dehydratedState={pageProps.ssrState}>
              <Component {...pageProps} />
            </ReactQueryProvider>

            <style jsx global>{`
              html {
                --family-sans: ${inter.style.fontFamily};
                --family-second: ${workSans.style.fontFamily};
              }
            `}</style>
          </>
        )}
      </ModulesContainer>
    </ReactQueryProvider>
  )
}
