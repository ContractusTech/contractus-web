import { useEffect } from 'react'

import { useTokens } from '@/api/hooks/useTokens'
import { useUser } from '@/api/hooks/useUser'
import { useSelectedTokensStore } from '@/app/store/selectedTokensStore'
import { TokenWithChecked } from '@/app/types'

type BalanceProviderProps = {
  children: React.ReactNode
}

const BSC_WRAP = ['BNB', 'WBNB']
const SOL_WRAP = ['SOL', 'WSOL']

export const BalanceProvider = (props: BalanceProviderProps) => {
  const { setSelectedTokens } = useSelectedTokensStore()

  const { tokens } = useTokens()
  const { user } = useUser()

  const getInitialState = async () => {
    if (tokens) {
      const storedTokens = localStorage.getItem('selectedTokens')
      const fromLocalStore: TokenWithChecked[] = JSON.parse(
        storedTokens ?? '[]'
      )

      const balanceWrap = user?.blockchain === 'solana' ? SOL_WRAP : BSC_WRAP
      const withDisabledTokens: TokenWithChecked[] =
        tokens.map(token => {
          const disabled = balanceWrap.includes(token.code)
          const mustAutoEnabled = [...balanceWrap, 'CTUS'].includes(token.code)

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
    getInitialState()
  }, [])

  return props.children
}
