import { Deal } from '@/api/generated-api'

import { EditCommentButton } from './EditCommentButton'

export const CommentField = ({ deal }: { deal: Deal }) => {
  return (
    <div className="relative">
      <span className="ml-[8px] text-[24px]">Details</span>
      <div className="flex min-h-[120px] flex-col gap-[13px] rounded-[13px] border-[1px] border-[#2A2E37] p-[8px]">
        {deal.meta?.content?.text ?? 'Empty'}
      </div>

      <div className="absolute bottom-[13px] right-[13px]">
        <EditCommentButton deal={deal} />
      </div>
    </div>
  )
}
