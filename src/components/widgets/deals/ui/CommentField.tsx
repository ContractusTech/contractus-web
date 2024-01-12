import { EditCommentButton } from './EditCommentButton'

export const CommentField = () => {
  return (
    <div className="relative flex h-full w-full justify-between  rounded-[13px] border-[1px] border-[#2A2E37] bg-[#15151A] p-[20px]">
      <div className="flex flex-col">
        <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
          <span className="text-[22px] text-[#fff]">Text</span>
        </div>

        <span className="max-w-[90%] text-[13px] font-[500] text-[#656975]">
          This text will be encrypted and available for viewing only to contract
          partners.
        </span>
      </div>

      <div className="absolute right-[20px] top-[20px]">
        <EditCommentButton />
      </div>
    </div>
  )
}
