import { EditCommentButton } from './EditCommentButton'

export const CommentField = () => {
  return (
    <div className="relative flex h-full w-full justify-between  rounded-[19px] border-[1px] border-[#262930] bg-secondary p-[20px]">
      <div className="flex flex-col">
        <div className="flex items-center gap-[8px]">
          <span className="text-2xl text-[#fff]">Text</span>
        </div>

        <span className="mt-[16px] max-w-[90%] text-sm font-[400] text-[#656975]">
          This text will be available for viewing only to contract partners.
        </span>
      </div>

      <div className="absolute right-[20px] top-[20px]">
        <EditCommentButton />
      </div>
    </div>
  )
}
