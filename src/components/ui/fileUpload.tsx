import { useEffect, useMemo, useRef, useState } from 'react'

import { api } from '@/api/client'
import { UploadedFile } from '@/api/generated-api'
import { useRolesStore } from '@/app/store/roles-store'
import { calculateMD5 } from '@/lib/utils'

import { Button } from './button'

type FileUploadProps = {
  onFileUploaded?: (file: UploadedFile & { name: string; size: number }) => void
  children: React.ReactNode
  className?: string
  type: 'result' | 'meta'
}

export const FileUpload = ({
  onFileUploaded,
  children,
  className,
  type
}: FileUploadProps) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const { dealCanceled, iExecutor, iClient } = useRolesStore()

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

  const canAttach = useMemo(() => {
    if (type === 'meta') {
      return iClient
    } else if (type === 'result') {
      return iExecutor
    }

    return false
  }, [iClient, iExecutor, type])

  if (dealCanceled) {
    return null
  }

  return (
    <>
      <Button
        data-tooltip-id={!canAttach ? 'only-client' : ''}
        onClick={handleFileInputClick}
        className={className}
        variant={'tertiary'}
        disabled={!canAttach}
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
