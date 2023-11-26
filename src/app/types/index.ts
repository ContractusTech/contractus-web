import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type DeviceType = 'BROWSER'

type Blockchain = 'solana' | 'bsc'

export type PreparedToken = {
  type: DeviceType
  blockchain: Blockchain
  pubKey: string
  signature: string
  identifier: string
}
