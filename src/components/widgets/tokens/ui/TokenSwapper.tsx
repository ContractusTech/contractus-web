import { useAutoAnimate } from '@formkit/auto-animate/react'
import Link from 'next/link'

import { useTokens } from '@/api/modules/tokens/hooks/useTokens'
import { getCtusBsc, getCtusSolana } from '@/app/constants/getCTUSUrls'
import { useUserStore } from '@/app/store/user-store'
import { AddCircleIcon } from '@/assets/svg/AddCircleIcon'
import { CrownIcon } from '@/assets/svg/CrownIcon'
import { Button } from '@/components/ui/button'

import { Balance } from '../../estimatedBalance'
import { SelectTokens } from '..'
import { NetworkTokens } from './NetworkTokens'
import { Token } from './Token'

export const TokenSwapper = () => {
  const [parent] = useAutoAnimate()
  const { tokens } = useTokens()

  const { connectedUser, balance, setSelectedTokens, selectedTokens } =
    useUserStore()

  return (
    <>
      <Balance amount={balance?.estimateAmount ?? '0'} />
      <section className="mx-auto mb-30 flex gap-13 md:flex-wrap md:justify-center">
        <Button variant="secondary">
          <AddCircleIcon className="mr-4 h-16 w-16" />
          Buy
        </Button>
        <Link
          href={
            connectedUser?.blockchain === 'bsc' ? getCtusBsc : getCtusSolana
          }
          className="flex h-38 items-center gap-x-8 rounded-[12px] border border-input bg-background px-20 py-10 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          target="_blank"
        >
          <CrownIcon className="mr-4 h-16 w-16" />
          Get CTUS Token
        </Link>
      </section>

      <section className="mb-16 w-full border-t-[1px] border-[#262930] border-border">
        <div className="mb-6 flex items-center justify-between px-15 py-13">
          <h2 className="typo-label">TOKENS</h2>
          {tokens && (
            <SelectTokens
              multiple
              tokens={selectedTokens}
              onSelect={setSelectedTokens}
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
    </>
  )
}
