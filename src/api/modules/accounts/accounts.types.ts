import { api } from '@/api/client'

export type StaticticType = {
  type: 'LOCKED'
  amount: 0
  currency: 'USD'
}

export type StatisticsType = StaticticType[]

export type BalanceRequestType = Parameters<
  typeof api.accounts.balanceCreate
>[0]

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
}
