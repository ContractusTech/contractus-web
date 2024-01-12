import { UserCog, UserIcon } from 'lucide-react'

export const RoleSignatureView = () => {
  return (
    <div className="grid grid-cols-[1fr_1px_1fr_1px_1fr] rounded-[13px] border-[1px] border-[#2A2E37] ">
      <div className="flex flex-col items-center justify-self-center p-[13px]">
        <UserIcon />
        <div className="flex items-center gap-[13px]">
          <span>Client</span>
        </div>

        <span className="text-[12px] text-[#8b8f97]">No signature</span>
      </div>

      <div className="bg-[#2A2E37]"></div>

      <div className="flex flex-col items-center justify-self-center p-[13px]">
        <UserCog />
        <span>Executor</span>
        <span className="text-[12px] text-[#8b8f97]">No signature</span>
      </div>

      <div className="bg-[#2A2E37]"></div>

      <div className="flex flex-col items-center justify-self-center p-[13px]">
        <UserCog />
        <span>Checker</span>
        <span className="text-[12px] text-[#8b8f97]">No signature</span>
      </div>
    </div>
  )
}
