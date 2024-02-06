import { formatUnits } from 'viem'

import { Deal } from '@/api/generated-api'
import httpClient from '@/api/httpClient'
import { useTokens } from '@/api/modules/tokens/hooks/useTokens'
import { useDealStore } from '@/app/store/deal-store'
import { useUserStore } from '@/app/store/user-store'
import { transformString } from '@/lib/utils'

import { CheckerAmountChange } from './CheckerAmountChange'
import { EditAddressButton } from './EditAddressButton'

export const CheckerEdit = () => {
  const { deal, setDeal } = useDealStore()
  const { tokens } = useTokens()

  const { connectedUser } = useUserStore()

  const handleCheckerEdit = async (address: string) => {
    if (!deal) {
      throw new Error('No deal')
    }

    const { data } = await httpClient<Deal>({
      url: `deals/${deal.id}/participate`,
      method: 'POST',
      data: {
        type: 'CHECKER',
        publicKey: address,
        blockchain: connectedUser?.blockchain
      }
    })

    setDeal(data)
  }

  return (
    <div className="flex h-full w-full justify-between  rounded-[19px] border-[1px] border-[#262930] bg-secondary p-[20px]">
      <div className="flex flex-col">
        <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
          <span className="text-sm font-medium text-[#656975]">CHECKER</span>
        </div>
        <span className="mt-[16px] text-[22px] font-[500]">
          {deal?.checkerPublicKey
            ? transformString(deal.checkerPublicKey)
            : 'Empty'}
        </span>
        {deal?.checkerAmount && (
          <div className="mt-[9px] flex items-end gap-[4px]">
            <span className="text-2xl font-[500]">
              {formatUnits(
                BigInt(deal?.checkerAmount ?? 0),
                tokens?.find(
                  token => token.address === deal.checkerToken?.address
                )?.decimals ?? 0
              )}
            </span>
            <span className=" mb-[2px] text-base font-[600] text-[#656975]">
              {
                /* @ts-ignore */
                tokens?.find(
                  token => token.address === deal?.checkerToken?.address
                )?.code
              }
            </span>
          </div>
        )}

        <span className="mt-[16px] text-sm font-[400] text-[#656975]">
          Perform the work specified in the contract
        </span>
      </div>

      <div className="flex gap-[8px]">
        <EditAddressButton title="Edit checker" onSave={handleCheckerEdit} />
        <CheckerAmountChange />
      </div>
    </div>
  )
}
