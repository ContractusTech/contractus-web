export type StaticticType = {
  type: 'LOCKED'
  amount: 0
  currency: 'USD'
}

export type StatisticsType = StaticticType[]

export type BalanceRequestType = {
  tokens: {
    code: string
    address: string
  }[]
  currency: string
}

export type BalanceType = {
  estimateAmount: string
  blockchain: string
  tokens: [
    {
      value: string
      token: {
        code: string
        address: string
      }
    }
  ]
  wrap: string[]
}
