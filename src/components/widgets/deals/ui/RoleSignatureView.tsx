import { UserCog, UserIcon } from 'lucide-react'
import { useMemo } from 'react'

import { useDealStore } from '@/app/store/deal-store'
import { useUserStore } from '@/app/store/user-store'
import Tag from '@/components/ui/tag'

const YTag = () => <Tag className=" absolute  right-[8px] top-[8px]">You</Tag>

export const RoleSignatureView = () => {
  const { deal, dealActions } = useDealStore()

  const { connectedUser } = useUserStore()

  const withChecker = useMemo(
    () => deal?.completionCheckType === 'CHECKER',
    [deal]
  )

  const iOwner = useMemo(
    () => deal?.ownerPublicKey === connectedUser?.publicKey,
    [connectedUser?.publicKey, deal?.ownerPublicKey]
  )

  const iContractor = useMemo(
    () => deal?.contractorPublicKey === connectedUser?.publicKey,
    [connectedUser?.publicKey, deal?.contractorPublicKey]
  )

  const iClient = useMemo(() => {
    if (
      (iOwner && deal?.ownerRole === 'CLIENT') ||
      (deal?.ownerRole === 'EXECUTOR' && iContractor)
    ) {
      return true
    }

    return false
  }, [deal?.ownerRole, iContractor, iOwner])

  const iExecutor = useMemo(() => {
    if (
      (iOwner && deal?.ownerRole === 'EXECUTOR') ||
      (deal?.ownerRole === 'CLIENT' && iContractor)
    ) {
      return true
    }

    return false
  }, [deal?.ownerRole, iContractor, iOwner])

  const iChecker = useMemo(
    () => deal?.checkerPublicKey === connectedUser?.publicKey,
    [connectedUser?.publicKey, deal?.checkerPublicKey]
  )

  return (
    <div
      className={`grid ${
        withChecker
          ? 'grid-cols-[1fr_1px_1fr_1px_1fr]'
          : 'grid-cols-[1fr_1px_1fr]'
      }  rounded-[13px] border-[1px] border-[#2A2E37]`}
    >
      <div className="relative flex w-full flex-col items-center justify-self-center p-[13px]">
        {iClient && <YTag />}
        <UserIcon />
        <div className="flex items-center gap-[13px]">
          <span>Client</span>
        </div>
        <span className="text-[12px] text-[#8b8f97]">
          {deal?.ownerRole === 'CLIENT'
            ? dealActions?.signedByOwner
              ? 'Signed'
              : 'No signature'
            : dealActions?.signedByContractor
            ? 'Signed'
            : 'No signature'}
        </span>
      </div>

      <div className="bg-[#2A2E37]"></div>

      <div className="relative flex w-full flex-col items-center justify-self-center p-[13px]">
        {iExecutor && <YTag />}
        <UserCog />
        <span>Executor</span>
        <span className="text-[12px] text-[#8b8f97]">
          {deal?.ownerRole === 'EXECUTOR'
            ? dealActions?.signedByOwner
              ? 'Signed'
              : 'No signature'
            : dealActions?.signedByContractor
            ? 'Signed'
            : 'No signature'}
        </span>
      </div>

      <div className="bg-[#2A2E37]"></div>

      {withChecker && (
        <div className="flex w-full flex-col items-center justify-self-center p-[13px]">
          {iChecker && <YTag />}
          <UserCog />
          <span>Checker</span>
          <span className="text-[12px] text-[#8b8f97]">
            {dealActions?.signedByChecker ? 'Signed' : 'No signature'}
          </span>
        </div>
      )}
    </div>
  )
}
