import { useAutoAnimate } from '@formkit/auto-animate/react'

import { api } from '@/api/client'
import { UploadedFile } from '@/api/generated-api'
import { useDealStore } from '@/app/store/deal-store'
import { FileCard } from '@/components/ui/fileCard'
import { FileUpload } from '@/components/ui/fileUpload'

type FileWithName = UploadedFile & { name: string; size: number }

export const FileList = ({ type }: { type: 'result' | 'meta' }) => {
  const { deal, setDeal, updateDeal } = useDealStore()
  const [parent] = useAutoAnimate()

  const handleFileUpload = async (file: FileWithName) => {
    if (!deal) {
      throw new Error('No deal')
    }

    const oldFiles = deal.meta?.files ?? []
    await api.deals[type === 'meta' ? 'metaCreate' : 'resultsCreate'](deal.id, {
      [type]: {
        files: [...oldFiles, { ...file, encrypted: false }]
      },
      updatedAt: new Date().toISOString()
    })

    await updateDeal()
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleDelete = async (url: string) => {
    if (!deal) {
      throw new Error('No deal')
    }

    const oldFiles = deal.meta?.files ?? []

    await api.deals[type === 'meta' ? 'metaCreate' : 'resultsCreate'](deal.id, {
      [type]: {
        files: oldFiles.filter(file => file.url !== url)
      },
      updatedAt: new Date().toISOString()
    })

    api.deals.dealsDetail(deal.id).then(deal => setDeal(deal))
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
          deal.meta?.files?.map(file => (
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
