import { MAX_SEED_LENGTH } from '@solana/web3.js'
import { useMemo } from 'react'

import { useDeal } from '@/api/hooks/useDeal'
import { useRolesStore } from '@/app/store/roles-store'

import { EditCommentButton } from './EditCommentButton'
import { EditDescription } from './EditDescription'

const MESSAGE_LENGTH_MAX = 210

export const CommentField = ({ type }: { type: 'result' | 'meta' }) => {
  const { dealCanceled, iClient, iExecutor } = useRolesStore()
  const { deal } = useDeal()

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

  const dealTextMessage = useMemo(() => {
    const isEncrypted = deal?.encryptedSecretKey
    if (isEncrypted) {
      return Array.from({ length: MESSAGE_LENGTH_MAX }).fill('*').join('')
    }

    return deal?.meta?.content.text
  }, [deal?.encryptedSecretKey, deal?.meta?.content.text])

  return (
    <div
      className={`relative flex h-full w-full justify-between overflow-hidden  rounded-[19px] border-[1px] border-[#262930] bg-secondary p-[20px]`}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-[8px]">
          <span className="text-2xl text-[#fff]">Text</span>
        </div>

        <span
          className={`white mt-[16px]  break-all text-sm font-[400] text-[#656975] ${
            dealTextMessage ? 'text-[#fff]' : 'text-[#656975]'
          }`}
        >
          {dealTextMessage ??
            'This text will be available for viewing only to contract partners.'}
        </span>
      </div>

      <div className="absolute right-[20px] top-[20px]">
        {type === 'meta' && canEdit ? (
          <EditDescription />
        ) : (
          <EditCommentButton type={'result'} edit={canEdit} />
        )}
      </div>

      {/* @ts-ignore */}
      {dealTextMessage?.length > MAX_SEED_LENGTH && (
        <div className="absolute bottom-0 left-0 h-[140px] w-full bg-gradient-to-t from-[#0b0b0d]" />
      )}
    </div>
  )
}
