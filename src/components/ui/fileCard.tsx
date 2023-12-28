import { Download } from 'lucide-react'
import Link from 'next/link'

import { AppFile } from '@/app/types'
import { transformString } from '@/lib/utils'

type FileCardProps = {
  file: AppFile
}

export const FileCard = ({ file }: FileCardProps) => {
  return (
    <Link
      href={file.url}
      target="_blank"
      className="flex aspect-square  flex-col items-center justify-center gap-[13px] rounded-[4px] bg-[#15151A] p-[12px] transition-all hover:bg-[#3a3a49]"
    >
      <span>{transformString(file.name)}</span>
      <Download />
    </Link>
  )
}
