import { useEffect } from 'react'

import { api } from '@/api/client'
import { BalanceType } from '@/api/modules/accounts/accounts.types'
import { useUserStore } from '@/app/store/user-store'
import { TokenWithChecked } from '@/app/types'

type BalanceProviderProps = {
  children: React.ReactNode
}

export const BalanceProvider = (props: BalanceProviderProps) => {
  const { selectedTokens, setBalance, setSelectedTokens, connectedUser } =
    useUserStore()

  const getInitialState = async () => {
    const tokens = await api.resources.tokensList()
    const storedTokens = localStorage.getItem('selectedTokens')
    const fromLocalStore: TokenWithChecked[] = JSON.parse(storedTokens ?? '[]')
    const baseBalance = await api.accounts.balanceCreate({ currency: 'USD' })

    if (baseBalance.wrap) {
      const withDisabledTokens: TokenWithChecked[] =
        tokens.map(token => {
          const disabled = baseBalance.wrap?.includes(token.code)
          const mustAutoEnabled = [...baseBalance.wrap!, 'CTUS'].includes(
            token.code
          )
          return {
            ...token,
            disabled,
            checked:
              fromLocalStore.find(
                storagedToken => storagedToken.code === token.code
              )?.checked ?? mustAutoEnabled
          }
        }) ?? []

      setSelectedTokens(withDisabledTokens)
    }
  }

  useEffect(() => {
    if (connectedUser) {
      getInitialState()
    }
  }, [connectedUser])

  const fetchBalance = async () => {
    const balance = await api.accounts.balanceCreate({
      currency: 'USD',
      tokens: selectedTokens
        .filter(selectedToken => !!selectedToken.checked)
        .map(selectedToken => ({
          code: selectedToken.code,
          address: selectedToken.address
        }))
    })

    // @ts-ignore
    return balance as BalanceType
  }

  useEffect(() => {
    fetchBalance().then(balance => setBalance(balance))
  }, [selectedTokens])

  return props.children
}
