import { formatUnits } from 'viem'

import { Deal } from '@/api/generated-api'
import { useDeal } from '@/api/hooks/useDeal'
import { ERRORS } from '@/app/constants/errors'

import { BondAmountChange } from './BondAmountChange'

export const PerformanceBond = () => {
  const { deal } = useDeal()

  const getTokenLabel = (role: Deal['ownerRole']) => {
    if (!deal) {
      throw new Error(ERRORS.DEAL_EXISTS)
    }

    const token =
      deal.ownerRole === role ? deal.ownerBondToken : deal.contractorBondToken

    if (token === undefined || token === null) {
      return ''
    }

    return token?.code
  }

  const getAmountValue = (role: Deal['ownerRole']) => {
    if (!deal) {
      throw new Error(ERRORS.DEAL_EXISTS)
    }

    const amount =
      deal.ownerRole === role ? deal.ownerBondAmount : deal.contractorBondAmount

    if (amount === null || amount === undefined) {
      return 'Empty'
    }

    const parsedAmount = BigInt(amount)

    const token =
      deal.ownerRole === role ? deal.ownerBondToken : deal.contractorBondToken

    if (!token?.decimals) {
      throw new Error('Error on decimals parsing')
    }

    return formatUnits(parsedAmount, token.decimals)
  }

  return (
    <>
      <div className="flex flex-col gap-[8px] leading-[120%]">
        <span className="text-3xl font-[500]">Performance bond</span>
        <span className="text-md text-[#656975]">
          This is guarantee to mitigate the risk
        </span>
      </div>

      {(deal?.performanceBondType === 'ONLY_EXECUTOR' ||
        deal?.performanceBondType === 'BOTH') && (
        <div className="relative flex h-full w-full justify-between  rounded-[19px] border-[1px] border-[#262930] bg-secondary p-[20px]">
          <div className="flex flex-col">
            <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
              <span className="text-sm font-medium text-[#656975]">
                EXECUTOR
              </span>
            </div>

            <div className="flex items-end gap-[8px]">
              <span className="text-[29px] font-[500]">
                {getAmountValue('EXECUTOR')}
              </span>
              <span className="mb-[9px] text-base font-[600] text-[#656975]">
                {getTokenLabel('EXECUTOR')}
              </span>
            </div>

            <span className="mt-[16px] text-sm font-[400] text-[#656975]">
              Upon completion of the deal, the funds will be returned to the
              executor
            </span>
          </div>

          {deal.ownerRole === 'EXECUTOR' ? (
            <BondAmountChange type="owner" />
          ) : (
            <BondAmountChange type="contractor" />
          )}
        </div>
      )}

      {(deal?.performanceBondType === 'ONLY_CLIENT' ||
        deal?.performanceBondType === 'BOTH') && (
        <div className="relative flex h-full w-full justify-between  rounded-[19px] border-[1px] border-[#262930] bg-secondary p-[20px]">
          <div className="flex flex-col">
            <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
              <span className="text-sm font-medium text-[#656975]">CLIENT</span>
            </div>

            <div className="flex items-end gap-[8px]">
              <span className="text-[29px] font-[500]">
                {getAmountValue('CLIENT')}
              </span>
              <span className="mb-[9px] text-[15px] text-[#656975]">
                {getTokenLabel('CLIENT')}
              </span>
            </div>

            <span className="mt-[16px] text-sm font-[400] text-[#656975]">
              Upon completion of the deal, the funds will be returned to the
              executor
            </span>
          </div>

          {deal.ownerRole === 'CLIENT' ? (
            <BondAmountChange type="owner" />
          ) : (
            <BondAmountChange type="contractor" />
          )}
        </div>
      )}
    </>
  )
}
