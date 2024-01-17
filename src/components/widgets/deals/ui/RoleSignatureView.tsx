import { UserCog, UserIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { api } from '@/api/client'
import { DealActions } from '@/api/generated-api'
import { useDealStore } from '@/app/store/deal-store'

export const RoleSignatureView = () => {
  const { deal } = useDealStore()

  const [dealActions, setDealActions] = useState<DealActions>()

  const withChecker = useMemo(
    () => deal?.completionCheckType === 'CHECKER',
    [deal]
  )

  useEffect(() => {
    deal?.id &&
      api.deals.actionsDetail(deal.id).then(data => setDealActions(data))
  }, [deal?.id])

  return (
    <div
      className={`grid grid-cols-[1fr_1px_1fr${
        withChecker ? '_1px_1fr' : ''
      }] rounded-[13px] border-[1px] border-[#2A2E37]`}
    >
      <div className="flex flex-col items-center justify-self-center p-[13px]">
        <UserIcon />
        <div className="flex items-center gap-[13px]">
          <span>Client</span>
        </div>

        <span className="text-[12px] text-[#8b8f97]">
          {deal?.ownerRole === 'CLIENT'
            ? /* @ts-ignore */
              dealActions?.signedByOwner
              ? 'Signed'
              : 'No signature'
            : /* @ts-ignore */
            dealActions.signedByContractor
            ? 'Signed'
            : 'No signature'}
        </span>
      </div>

      <div className="bg-[#2A2E37]"></div>

      <div className="flex flex-col items-center justify-self-center p-[13px]">
        <UserCog />
        <span>Executor</span>
        <span className="text-[12px] text-[#8b8f97]">
          {deal?.ownerRole === 'EXECUTOR'
            ? /* @ts-ignore */
              dealActions?.signedByOwner
              ? 'Signed'
              : 'No signature'
            : /* @ts-ignore */
            dealActions?.signedByContractor
            ? 'Signed'
            : 'No signature'}
        </span>
      </div>

      <div className="bg-[#2A2E37]"></div>

      {withChecker && (
        <div className="flex flex-col items-center justify-self-center p-[13px]">
          <UserCog />
          <span>Checker</span>
          <span className="text-[12px] text-[#8b8f97]"></span>
        </div>
      )}
    </div>
  )
}
