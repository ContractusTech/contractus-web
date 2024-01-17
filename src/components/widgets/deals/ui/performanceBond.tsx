import { useDealStore } from '@/app/store/deal-store'

import { BondOwnerAmountChange } from './BondOwnerAmountChange'

export const PerformanceBond = () => {
  const { deal } = useDealStore()

  return (
    <>
      <div className="flex flex-col gap-[8px] leading-[120%]">
        <span className="text-[29px] font-[500]">Performance bond</span>
        <span className="text-[13px] text-[#656975]">
          This is guarantee to mitigate the risk
        </span>
      </div>

      {(deal?.performanceBondType === 'ONLY_EXECUTOR' ||
        deal?.performanceBondType === 'BOTH') && (
        <div className="relative flex h-full w-full justify-between  rounded-[13px] border-[1px] border-[#2A2E37] bg-[#15151A] p-[20px]">
          <div className="flex flex-col">
            <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
              <span className="text-[15px] font-[600] text-[#656975]">
                EXECUTOR
              </span>
            </div>

            <div className="flex items-end gap-[8px]">
              <span className="text-[29px] font-[500]">
                {(deal.ownerRole === 'EXECUTOR'
                  ? deal.ownerBondAmount
                  : deal.contractorBondAmount) ?? 'Empty'}
              </span>
              <span className="mb-[9px] text-[15px] text-[#656975]">WBNB</span>
            </div>

            <span className="text-[13px] font-[500] text-[#656975]">
              Upon completion of the deal, the funds will be returned to the
              executor
            </span>
          </div>

          {deal.ownerRole === 'EXECUTOR' ? (
            <BondOwnerAmountChange />
          ) : (
            <BondOwnerAmountChange />
          )}
        </div>
      )}

      {(deal?.performanceBondType === 'ONLY_CLIENT' ||
        deal?.performanceBondType === 'BOTH') && (
        <div className="relative flex h-full w-full justify-between  rounded-[13px] border-[1px] border-[#2A2E37] bg-[#15151A] p-[20px]">
          <div className="flex flex-col">
            <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
              <span className="text-[15px] font-[600] text-[#656975]">
                CLIENT
              </span>
            </div>

            <div className="flex items-end gap-[8px]">
              <span className="text-[29px] font-[500]">
                {(deal.ownerRole === 'CLIENT'
                  ? deal.ownerBondAmount
                  : deal.contractorBondAmount) ?? 'Empty'}
              </span>
              <span className="mb-[9px] text-[15px] text-[#656975]">WBNB</span>
            </div>

            <span className="text-[13px] font-[500] text-[#656975]">
              Upon completion of the deal, the funds will be returned to the
              executor
            </span>
          </div>

          {deal.ownerRole === 'CLIENT' ? (
            <BondOwnerAmountChange />
          ) : (
            <BondOwnerAmountChange />
          )}
        </div>
      )}
    </>
  )
}
