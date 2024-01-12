import { filesize } from 'filesize'
import { File, Image as ImageIcon, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'

import { AppFile } from '@/app/types'

type FileCardProps = {
  file: AppFile
  onDelete?: () => void
}

const IMAGE_EXTENSIONS = new Set(['png', 'jpeg', 'jpg', 'gif', 'bmp', 'tiff'])
const FILE_EXTENSIONS = new Set(['docs', 'pdf', 'txt', 'xlsx', 'pptx'])

const getFileIcon = (extension: string) => {
  if (IMAGE_EXTENSIONS.has(extension)) {
    return <ImageIcon color="#2A2C34" />
  } else if (FILE_EXTENSIONS.has(extension)) {
    return <File color="#2A2C34" />
  } else {
    return <File color="#2A2C34" />
  }
}

export const FileCard = ({ file, onDelete }: FileCardProps) => {
  const fileSize = useMemo(() => filesize(file.size), [file.size])

  const fileIcon = useMemo(() => {
    const extension = file.name.split('.').pop()
    const icon = getFileIcon(extension ?? '')
    return icon
  }, [file.name])

  return (
    <Link
      href={file.url}
      target="_blank"
      className="flex cursor-pointer items-center  gap-[13px] bg-[#15151A] p-[12px_20px] transition-all hover:bg-[#3a3a49]"
    >
      {fileIcon}
      <div className="flex flex-col">
        <span>{file.name}</span>
        <span className="text-[#656975] ">{fileSize}</span>
      </div>

      <button className="ml-[auto] cursor-pointer" onClick={onDelete}>
        <XCircle fill="#8D92A1" color="#15151b" />
      </button>
    </Link>
  )
}
