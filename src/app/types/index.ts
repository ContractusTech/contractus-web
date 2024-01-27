import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'

import { api } from '@/api/client'
import { Tokens } from '@/api/generated-api'

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

export type PerformanceBondType = Parameters<
  typeof api.deals.dealsCreate
>['0']['performanceBondType']

export type Role = 'CLIENT' | 'EXECUTOR'

export type AppFile = {
  url: string
  md5: string
  name: string
  size: number
  encrypted: boolean
}

export type TokenWithChecked = Tokens[number] & {
  checked?: boolean
  disabled?: boolean
}
