import { UserCog, UserIcon } from 'lucide-react'

import Tag from '@/components/ui/tag'

export const RoleSignatureView = () => {
  return (
    <div className="grid grid-cols-[1fr_1px_1fr] rounded-[13px] border-[1px] border-[#2A2E37] p-[13px]">
      <div className="flex flex-col items-center justify-self-center">
        <UserIcon />
        <div className="flex items-center gap-[13px]">
          <span>Client</span>
          <Tag>You</Tag>
        </div>

        <span className="text-[12px] text-[#8b8f97]">No signature</span>
      </div>

      <div className="bg-[#2A2E37]"></div>

      <div className="flex flex-col items-center justify-self-center">
        <UserCog />
        <span>Executor</span>
        <span className="text-[12px] text-[#8b8f97]">No signature</span>
      </div>
    </div>
  )
}
