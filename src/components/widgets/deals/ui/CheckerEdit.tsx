import { formatUnits } from 'viem'

import { useDeal } from '@/api/hooks/useDeal'
import { useTokens } from '@/api/hooks/useTokens'
import { useUser } from '@/api/hooks/useUser'
import httpClient from '@/api/httpClient'
import { PROMPTS } from '@/app/constants/prompts'
import { useRolesStore } from '@/app/store/roles-store'
import { Deal } from '@/app/types'
import { transformString } from '@/lib/utils'
import { useCustomPrompt } from '@/providers/DealChangeAlert'

import { CheckerAmountChange } from './CheckerAmountChange'
import { PartnerEdit } from './PartnerEdit'

export const CheckerEdit = () => {
  const { deal, refetchDeal } = useDeal()
  const { tokens } = useTokens()
  const { user } = useUser()
  const {
    dealCanceled,
    iOwner,
    signedByChecker,
    signedByClient,
    signedByExecutor
  } = useRolesStore()
  const { requestPrompt } = useCustomPrompt()

  const handleCheckerEdit = async (address: string) => {
    if ([signedByChecker, signedByClient, signedByExecutor].includes(true)) {
      const res = await requestPrompt(PROMPTS.CONFIGN_UNSIGN)

      if (!res) {
        return
      }
    }

    if (!deal) {
      throw new Error('No deal')
    }

    await httpClient<Deal>({
      url: `deals/${deal.id}/participate`,
      method: 'POST',
      data: {
        type: 'CHECKER',
        publicKey: address,
        blockchain: user?.blockchain
      }
    })

    await refetchDeal()
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

      {!dealCanceled && (
        <div className="flex gap-[8px]">
          <PartnerEdit
            onSave={handleCheckerEdit}
            disabled={!iOwner}
            data-tooltip-id={!iOwner ? 'only-owner' : ''}
          />
          <CheckerAmountChange />
        </div>
      )}
    </div>
  )
}
