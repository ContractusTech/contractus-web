import { useMemo } from 'react'

import { useRolesStore } from '@/app/store/roles-store'

import { EditCommentButton } from './EditCommentButton'
import { EditDescription } from './EditDescription'

export const CommentField = ({ type }: { type: 'result' | 'meta' }) => {
  const { dealCanceled, iClient, iExecutor } = useRolesStore()

  const canEdit = useMemo(() => {
    if (type === 'meta') {
      return iClient && !dealCanceled
    }
    //
    else if (type === 'result') {
      return iExecutor && !dealCanceled
    }

    return false
  }, [dealCanceled, iExecutor])

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
        {type === 'meta' && canEdit ? (
          <EditDescription />
        ) : (
          <EditCommentButton type={type} edit={canEdit} />
        )}
      </div>
    </div>
  )
}
