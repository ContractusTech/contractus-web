import { UserCog, UserIcon } from 'lucide-react'

import { useRolesStore } from '@/app/store/roles-store'
import Tag from '@/components/ui/tag'

const YTag = () => <Tag className=" absolute  right-[8px] top-[8px]">You</Tag>

export const RoleSignatureView = () => {
  const {
    iChecker,
    iClient,
    iExecutor,
    signedByChecker,
    signedByClient,
    signedByExecutor,
    withChecker
  } = useRolesStore()

  return (
    <div
      className={`grid ${
        withChecker
          ? 'grid-cols-[1fr_1px_1fr_1px_1fr]'
          : 'grid-cols-[1fr_1px_1fr]'
      }  rounded-[20px] border-[1px] border-[#2A2E37]`}
    >
      <div className="relative flex w-full flex-col items-center justify-self-center p-[13px]">
        {iClient && <YTag />}
        <UserIcon />
        <div className="flex items-center gap-[13px]">
          <span>Client</span>
        </div>
        <span
          className={`text-[12px] ${
            signedByClient ? 'text-[#589648]' : 'text-[#8b8f97]'
          } `}
        >
          {signedByClient ? 'Signed' : 'No signature'}
        </span>
      </div>

      <div className="bg-[#2A2E37]"></div>

      <div className="relative flex w-full flex-col items-center justify-self-center p-[13px]">
        {iExecutor && <YTag />}
        <UserCog />
        <span>Executor</span>
        <span
          className={`text-[12px] ${
            signedByExecutor ? 'text-[#589648]' : 'text-[#8b8f97]'
          } `}
        >
          {signedByExecutor ? 'Signed' : 'No signature'}
        </span>
      </div>

      <div className="bg-[#2A2E37]"></div>

      {withChecker && (
        <div className="flex w-full flex-col items-center justify-self-center p-[13px]">
          {iChecker && <YTag />}
          <UserCog />
          <span>Checker</span>
          <span
            className={`text-[12px] ${
              signedByChecker ? 'text-[#589648]' : 'text-[#8b8f97]'
            } `}
          >
            {signedByChecker ? 'Signed' : 'No signature'}
          </span>
        </div>
      )}
    </div>
  )
}
