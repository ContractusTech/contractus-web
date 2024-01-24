import { FC, ReactNode } from 'react'

import { DialogHeader, DialogTitle } from '@/components/ui/dialog'

type Props = {
  title?: string | JSX.Element | ReactNode
}

export const CreateDealHeader: FC<Props> = ({ title }) => {
  return (
    <>
      <DialogHeader className="flex items-center justify-center border-b-[1.5px] border-border py-20">
        <DialogTitle className="text-md font-medium leading-none">
          {title}
        </DialogTitle>
      </DialogHeader>
    </>
  )
}
