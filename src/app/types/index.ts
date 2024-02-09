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

export type Role = 'CLIENT' | 'EXECUTOR'

export type AppFile = {
  url: string
  md5: string
  name: string
  size: number
  encrypted: boolean
}

export type TokenWithChecked = Token & {
  checked?: boolean
  disabled?: boolean
}

export type ShortToken = {
  address: string
  code: string
}

export type Token = {
  address: string
  code: string
  decimals: number
  holderMode: boolean
  logoURL: string
  name: string
  native: boolean
  serviced: boolean
  symbol: string
}

export type Amount = {
  value: string
  token: ShortToken
}

export type AmountFull = {
  value: string
  token: Token
}

export type DealStatus =
  | 'NEW'
  | 'STARTED'
  | 'STARTING'
  | 'FINISHED'
  | 'FINISHING'
  | 'CANCELED'
  | 'CANCELING'
  | 'REVOKED'
  | 'EXPIRED'

export type PerformanceBondType =
  | 'ONLY_CLIENT'
  | 'ONLY_EXECUTOR'
  | 'BOTH'
  | 'NONE'

export type CompletionCheckType = 'CHECKER' | 'NONE'

export type OwnerRole = 'CLIENT' | 'EXECUTOR'

export type Content = {
  text: string
  md5: string
}

export type File = {
  url: string
  md5: string
  name: string
  size: number
  encrypted: boolean
}

export type Meta = {
  content: Content
  files: File[]
}

export interface Deal {
  id: string
  blockchain: string
  performanceBondType: PerformanceBondType
  completionCheckType: CompletionCheckType
  createdAt: string
  updatedAt?: string
  endedAt?: string
  deadline: string
  token: Token
  amount: string
  amountFee: string
  ownerPublicKey: string
  contractorPublicKey?: string
  checkerPublicKey?: string
  status: DealStatus
  ownerRole: OwnerRole
  encryptedSecretKey?: string
  secretKeyHash?: string
  sharedKey?: string
  ownerBondAmount?: string
  ownerBondToken?: Token
  contractorBondAmount?: string
  contractorBondToken?: Token
  checkerAmount?: string
  checkerToken?: Token
  metaUpdatedAt?: string
  meta?: Meta
  resultUpdatedAt?: string
  result?: Meta
}

export type DealFee = {
  allow: boolean
  allowHolderMode: boolean
  feeAmount: AmountFull
  fiatCurrency: string
  fiatFee: number
  isMinimum: boolean
  percent: number
  type: 'DEAL'
}

type AmountedToken = {
  address: null | string
  code: string
  decimals: number
  native: boolean
  serviced: boolean
}

export type BalanceType = {
  estimateAmount: string
  blockchain: string
  tokens: [
    {
      amount: {
        token: AmountedToken
        uiValue: number
        value: string
      }
      currency: 'USD'
      price: number
    }
  ]
  wrap: string[]
  tier: 'basic' | 'holder'
}
