import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'

import { useBalance } from '@/api/modules/accounts/hooks/useBalance'
import { useTokens } from '@/api/modules/tokens/hooks/useTokens'
import { TokenWithChecked } from '@/app/types'

import { SelectTokens } from '..'
import { NetworkTokens } from './NetworkTokens'
import { Token } from './Token'

export const TokenSwapper = () => {
  const [parent] = useAutoAnimate()
  const { tokens } = useTokens()
  const [selectedTokens, setSelectedTokens] = useState<TokenWithChecked[]>([])
  const { balance } = useBalance({
    currency: 'USD',
    tokens: selectedTokens
      .filter(selectedToken => !!selectedToken.checked)
      .map(selectedToken => ({
        code: selectedToken.code,
        address: selectedToken.address
      }))
  })

  const handleMonitoringTokens = (tokens: TokenWithChecked[]) => {
    setSelectedTokens(tokens)
    localStorage.setItem('selectedTokens', JSON.stringify(tokens))
  }

  useEffect(() => {
    const storedTokens = localStorage.getItem('selectedTokens')
    const fromLocalStore: TokenWithChecked[] = JSON.parse(storedTokens ?? '[]')

    if (!tokens || !balance) {
      return
    }

    const withDisabledTokens: TokenWithChecked[] =
      tokens.map(token => {
        const disabled = balance.wrap.includes(token.code)
        const mustAutoEnabled = [...balance.wrap, 'CTUS'].includes(token.code)

        return {
          ...token,
          disabled: !!disabled,
          checked:
            fromLocalStore.find(
              storagedToken => storagedToken.code === token.code
            )?.checked ?? mustAutoEnabled
        }
      }) ?? []

    setSelectedTokens(withDisabledTokens)
  }, [tokens, balance])

  return (
    <section className="mb-16 w-full border-t-[1px] border-[#262930] border-border">
      <div className="mb-6 flex items-center justify-between px-15 py-13">
        <h2 className="typo-label">TOKENS</h2>
        {tokens && (
          <SelectTokens
            multiple
            tokens={selectedTokens}
            onSelect={handleMonitoringTokens}
          />
        )}
      </div>

      <div className="flex flex-col gap-[13px]" ref={parent}>
        {(() => {
          const CTUS = balance?.tokens.find(
            token => token.amount.token.code === 'CTUS'
          )

          return CTUS ? (
            <Token
              reserve={CTUS.amount.uiValue}
              value={CTUS.price}
              tokenLabel={CTUS.amount.token.code}
            />
          ) : null
        })()}

        <NetworkTokens
          tokens={
            balance?.tokens.filter(
              token => balance?.wrap.includes(token.amount.token.code)
            ) ?? []
          }
        />

        {balance?.tokens
          .filter(
            token =>
              token.amount.token.code !== 'CTUS' &&
              !balance.wrap.includes(token.amount.token.code)
          )
          ?.map(token => (
            <Token
              key={token.amount.token.code}
              tokenLabel={token.amount.token.code}
              reserve={token.amount.uiValue}
              value={token.price}
            />
          ))}
      </div>
    </section>
  )
}
