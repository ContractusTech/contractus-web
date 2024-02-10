import { useEffect } from 'react'

import { useBalance } from '@/api/hooks/useBalance'
import { useTokens } from '@/api/hooks/useTokens'
import { useSelectedTokensStore } from '@/app/store/selectedTokensStore'
import { TokenWithChecked } from '@/app/types'

type BalanceProviderProps = {
  children: React.ReactNode
}

export const BalanceProvider = (props: BalanceProviderProps) => {
  const { setSelectedTokens } = useSelectedTokensStore()

  const { tokens } = useTokens()
  const { balance } = useBalance()

  const getInitialState = async () => {
    if (tokens && balance) {
      const storedTokens = localStorage.getItem('selectedTokens')
      const fromLocalStore: TokenWithChecked[] = JSON.parse(
        storedTokens ?? '[]'
      )

      if (balance.wrap) {
        const withDisabledTokens: TokenWithChecked[] =
          tokens.map(token => {
            const disabled = balance.wrap?.includes(token.code)
            const mustAutoEnabled = [...balance.wrap!, 'CTUS'].includes(
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
  }

  useEffect(() => {
    getInitialState()
  }, [])

  return props.children
}
