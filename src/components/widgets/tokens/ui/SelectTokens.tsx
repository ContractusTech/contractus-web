'use client'
import { FC, ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog'

import { SelectTokensHeader } from './SelectTokensHeader'
import { SelectTokensList } from './SelectTokensList'

type Props = {
  children?: ReactNode | JSX.Element
}

export const SelectTokens: FC<Props> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-[600px]">
        <SelectTokensHeader title="Select tokens" />
        <SelectTokensList />
        <DialogFooter>
          <div className="pb-30 flex justify-end px-32">
            <Button variant="default" size={'lg'}>
              Apply
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
