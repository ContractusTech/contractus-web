import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from 'react'

import { api } from '@/api/client'
import { UploadedFile } from '@/api/generated-api'
import { useDeal } from '@/api/hooks/useDeal'
import { PROMPTS } from '@/app/constants/prompts'
import { useRolesStore } from '@/app/store/roles-store'
import LoadingSpinner from '@/assets/svg/LoadingCircle'
import { FileCard } from '@/components/ui/fileCard'
import { FileUpload } from '@/components/ui/fileUpload'
import { useCustomPrompt } from '@/providers/DealChangeAlert'

type FileWithName = UploadedFile & { name: string; size: number }

export const FileList = ({ type }: { type: 'result' | 'meta' }) => {
  const { deal, refetchDeal } = useDeal()
  const [parent] = useAutoAnimate()
  const [attachLoading, setAttachLoading] = useState(false)
  const { signedByChecker, signedByClient, signedByExecutor } = useRolesStore()
  const { requestPrompt } = useCustomPrompt()

  const handleFileUpload = async (file: FileWithName) => {
    if (
      type === 'result' &&
      [signedByChecker, signedByClient, signedByExecutor].includes(true)
    ) {
      const res = await requestPrompt(PROMPTS.CONFIGN_UNSIGN)

      if (!res) {
        return
      }
    }

    setAttachLoading(true)
    if (!deal) {
      throw new Error('No deal')
    }

    const oldFiles = deal.meta?.files ?? []
    await api.deals[type === 'meta' ? 'metaCreate' : 'resultCreate'](deal.id, {
      [type]: {
        files: [...oldFiles, { ...file, encrypted: false }],
        content: deal[type]?.content
      },
      updatedAt: new Date().toISOString()
    })

    await refetchDeal()

    setAttachLoading(false)
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden  rounded-[19px] border-[1px] border-[#2A2E37] bg-secondary">
      <div className="flex flex-col p-[20px]">
        <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
          <span className="text-2xl text-[#fff]">Files</span>
        </div>
      </div>

      <div className="border-t-[1px] border-t-[#22222B]" ref={parent}>
        {deal &&
          deal[type]?.files?.map(file => (
            <FileCard key={file.url} file={file} type={type} />
          ))}

        {deal && (!deal[type] || deal[type]?.files.length === 0) && (
          <div className="p-[16px] text-left text-sm font-[400] text-[#656975]">
            The files will be available for viewing only to contract partners.
          </div>
        )}
      </div>

      <FileUpload
        className="absolute right-[20px] top-[20px] flex items-center gap-[8px] p-[20px]"
        onFileUploaded={handleFileUpload}
        type={type}
        key={`${attachLoading}`}
      >
        Attache {attachLoading && <LoadingSpinner />}
      </FileUpload>
    </div>
  )
}
