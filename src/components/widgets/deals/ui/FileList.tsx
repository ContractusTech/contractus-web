import { api } from '@/api/client'
import { Deal, UploadedFile } from '@/api/generated-api'
import { FileCard } from '@/components/ui/fileCard'
import { FileUpload } from '@/components/ui/fileUpload'

type FileListProps = {
  deal: Deal
}

type FileWithName = UploadedFile & { name: string; size: number }

export const FileList = ({ deal }: FileListProps) => {
  const handleFileUpload = (file: FileWithName) => {
    const oldFiles = deal.meta?.files ?? []
    api.deals.metaCreate(deal.id, {
      meta: {
        files: [...oldFiles, { ...file, encrypted: false }]
      },
      updatedAt: new Date().toISOString()
    })
  }

  return (
    <>
      <span className="ml-[8px] text-[24px]">Attachments</span>
      <div className="flex flex-col gap-[13px] rounded-[13px] border-[1px] border-[#2A2E37] p-[8px]">
        <div className="grid grid-cols-4 gap-[13px]">
          {deal.meta?.files?.map(file => (
            <FileCard key={file.url} file={file} />
          ))}
          <FileUpload onFileUploaded={handleFileUpload} />
        </div>
      </div>
    </>
  )
}
