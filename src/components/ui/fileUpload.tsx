import { useEffect, useRef, useState } from 'react'

import { api } from '@/api/client'
import { UploadedFile } from '@/api/generated-api'
import { calculateMD5 } from '@/lib/utils'

import { Button } from './button'

type FileUploadProps = {
  onFileUploaded?: (file: UploadedFile & { name: string; size: number }) => void
  children: React.ReactNode
  className?: string
}

export const FileUpload = ({
  onFileUploaded,
  children,
  className
}: FileUploadProps) => {
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
    <>
      <Button
        onClick={handleFileInputClick}
        className={className}
        variant={'tertiary'}
      >
        {children}
      </Button>
      <input
        ref={fileInput}
        type="file"
        className="hidden"
        onChange={e => {
          e.target.files && setFile(e.target.files[0])
        }}
      />
    </>
  )
}
