import { filesize } from 'filesize'
import { File, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { api } from '@/api/client'
import { useDeal } from '@/api/hooks/useDeal'
import { AppFile } from '@/app/types'
import LoadingSpinner from '@/assets/svg/LoadingCircle'

import { FileDelete } from './FileDelete'

type FileCardProps = {
  file: AppFile
  type: 'result' | 'meta'
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

export const FileCard = ({ file, type }: FileCardProps) => {
  const { deal, refetchDeal } = useDeal()

  const fileSize = useMemo(() => filesize(file.size), [file.size])
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fileIcon = useMemo(() => {
    const extension = file.name.split('.').pop()
    const icon = getFileIcon(extension ?? '')
    return icon
  }, [file.name])

  const handleDelete = async () => {
    setDeleteLoading(true)
    if (!deal) {
      throw new Error('No deal')
    }

    const oldFiles = deal.meta?.files ?? []

    await api.deals[type === 'meta' ? 'metaCreate' : 'resultCreate'](
      deal.id,
      {
        [type]: {
          files: oldFiles.filter(file => file.url !== file.url),
          content: deal[type]?.content
        },
        updatedAt: new Date().toISOString()
      },
      {
        headers: {
          test: 'deal_edit'
        }
      }
    )

    await refetchDeal()
    setDeleteLoading(false)
  }

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

      <div className="ml-[auto] cursor-pointer">
        {deleteLoading ? (
          <LoadingSpinner />
        ) : (
          <FileDelete onDelete={handleDelete} />
        )}
      </div>
    </Link>
  )
}
