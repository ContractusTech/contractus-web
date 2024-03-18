import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { FC, ReactNode, useState } from 'react'

import { TokenWithChecked } from '@/app/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog'

import { SelectTokensHeader } from './SelectTokensHeader'
import { TokensList } from './TokensList'

type Props = {
  children?: ReactNode | JSX.Element
  trigger?: ReactNode
  multiple?: boolean
  onSelect: (tokens: TokenWithChecked[]) => void
  tokens: TokenWithChecked[]
}

export const SelectTokens: FC<Props> = ({
  trigger,
  onSelect,
  multiple,
  tokens
}) => {
  const [open, setOpen] = useState(false)

  function handleTokenSelect(tokensList: TokenWithChecked[]) {
    onSelect(tokensList)
  }

  function handleOneSelect(token: TokenWithChecked) {
    onSelect([token])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {trigger ?? <AdjustmentsHorizontalIcon className="h-24 w-24" />}
      </DialogTrigger>
      <DialogContent className="w-full max-w-[600px]  rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.85)]">
        <SelectTokensHeader title="Select tokens" />
        <div className="max-h-[70vh] overflow-y-scroll px-32">
          {tokens && (
            <TokensList
              tokens={tokens}
              onSelect={handleTokenSelect}
              onOneSelect={handleOneSelect}
              multiple={multiple}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
