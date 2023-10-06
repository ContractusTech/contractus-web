import { FC, ReactNode } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

type Props = {
  title?: string
  children?: ReactNode | JSX.Element
  className?: string
  content?: ReactNode | JSX.Element
}

export const DialogCore: FC<Props> = ({ children, content }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  )
}
