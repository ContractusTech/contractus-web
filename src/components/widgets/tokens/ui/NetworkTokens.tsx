import { BalanceType } from '@/api/modules/accounts/accounts.types'
import { SwapArrowIcon } from '@/assets/svg/SwapArrowIcon'
import { Button } from '@/components/ui/button'

type NetworkTokensProps = {
  tokens: BalanceType['tokens'][number][]
}

export const NetworkTokens = ({ tokens }: NetworkTokensProps) => {
  return (
    <div className="relative mb-8 rounded-[16px] border border-solid border-[#262930] py-18">
      <div>
        {tokens.map(token => (
          <div
            key={token.amount.token.code}
            className="border-b-[1px] border-solid border-[#262930] px-16 py-11 first-line:pt-0 first:pt-0 last:border-0 last:pb-0 only:py-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-12">
                <span className="text-medium text-base leading-none">
                  {token.amount.token.code}
                </span>
                <span className="text-normal text-base leading-none text-muted-foreground ">
                  ${token.price}
                </span>
              </div>
              <div>
                <span className="text-medium text-base leading-none text-muted-foreground ">
                  {token.amount.uiValue.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 translate-y-[calc(-50%_+_1.5px)]">
        <Button variant="outline" size="icon">
          <SwapArrowIcon />
        </Button>
      </div>
    </div>
  )
}
