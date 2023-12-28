import { UploadFile } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'

import { api } from '@/api/client'
import { UploadedFile } from '@/api/generated-api'
import { calculateMD5 } from '@/lib/utils'

type FileUploadProps = {
  onFileUploaded?: (file: UploadedFile & { name: string; size: number }) => void
}

export const FileUpload = ({ onFileUploaded }: FileUploadProps) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (file) {
      calculateMD5(file)
        .then(md5 => api.files.uploadCreate({ file, md5 }))
        .then(
          data =>
            onFileUploaded &&
            onFileUploaded({ ...data, name: file.name, size: file.size })
        )
    }
  }, [file])

  const handleFileInputClick = () => {
    fileInput.current?.click()
  }

  return (
    <button
      onClick={handleFileInputClick}
      className="flex aspect-square  flex-col items-center justify-center gap-[13px] rounded-[4px] bg-[#15151A] p-[12px] transition-all hover:bg-[#3a3a49]"
    >
      <input
        ref={fileInput}
        type="file"
        className="hidden"
        onChange={e => {
          e.target.files && setFile(e.target.files[0])
        }}
      />
      <span>Upload file</span>
      <UploadFile />
    </button>
  )
}
