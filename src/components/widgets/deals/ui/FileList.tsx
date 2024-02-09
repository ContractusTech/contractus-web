import { useAutoAnimate } from '@formkit/auto-animate/react'

import { api } from '@/api/client'
import { UploadedFile } from '@/api/generated-api'
import { useDeal } from '@/api/hooks/useDeal'
import { FileCard } from '@/components/ui/fileCard'
import { FileUpload } from '@/components/ui/fileUpload'

type FileWithName = UploadedFile & { name: string; size: number }

export const FileList = ({ type }: { type: 'result' | 'meta' }) => {
  const { deal, refetchDeal } = useDeal()
  const [parent] = useAutoAnimate()

  const handleFileUpload = async (file: FileWithName) => {
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

    refetchDeal()
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleDelete = async (url: string) => {
    if (!deal) {
      throw new Error('No deal')
    }

    const oldFiles = deal.meta?.files ?? []

    await api.deals[type === 'meta' ? 'metaCreate' : 'resultCreate'](deal.id, {
      [type]: {
        files: oldFiles.filter(file => file.url !== url),
        content: deal[type]?.content
      },
      updatedAt: new Date().toISOString()
    })

    await refetchDeal()
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden  rounded-[19px] border-[1px] border-[#2A2E37] bg-secondary">
      <div className="flex flex-col p-[20px]">
        <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
          <span className="text-2xl text-[#fff]">Files</span>
        </div>
      </div>

      <div className=" border-t-[1px] border-t-[#22222B]" ref={parent}>
        {deal &&
          deal[type]?.files?.map(file => (
            <FileCard key={file.url} file={file} onDelete={handleDelete} />
          ))}
      </div>

      <FileUpload
        className="absolute right-[20px] top-[20px] p-[20px]"
        onFileUploaded={handleFileUpload}
      >
        Attache
      </FileUpload>
    </div>
  )
}
