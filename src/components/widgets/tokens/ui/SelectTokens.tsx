import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { FC, ReactNode, useState } from 'react'

import { Tokens } from '@/api/generated-api'
import { useTokens } from '@/api/modules/tokens/hooks/useTokens'
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
  selectable?: boolean
  onSelect?: (token: Tokens[number]) => void
}

export const SelectTokens: FC<Props> = ({ trigger, onSelect, selectable }) => {
  const { tokens } = useTokens()
  const [open, setOpen] = useState(false)

  function handleTokenSelect(token: Tokens[number]) {
    onSelect && onSelect(token)

    if (selectable) {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {trigger ?? <AdjustmentsHorizontalIcon className="h-24 w-24" />}
      </DialogTrigger>
      <DialogContent className="w-full max-w-[600px] rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.85)]">
        <SelectTokensHeader title="Select tokens" />
        <div className="px-32">
          {tokens && (
            <TokensList tokens={tokens} onSelect={handleTokenSelect} />
          )}
        </div>
        <DialogFooter>
          <div className="flex justify-end px-32 pb-30">
            <Button variant="default" size="lg" onClick={() => setOpen(false)}>
              Apply
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
