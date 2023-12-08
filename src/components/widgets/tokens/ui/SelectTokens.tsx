import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { FC, ReactNode, useState } from 'react'

import { useTokens } from '@/api/modules/tokens/hooks/useTokens'
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

export const SelectTokens: FC<Props> = () => {
  const { tokens } = useTokens()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <AdjustmentsHorizontalIcon className="h-24 w-24" />
      </DialogTrigger>
      <DialogContent className="w-full max-w-[600px] rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.85)]">
        <SelectTokensHeader title="Select tokens" />
        <SelectTokensList tokens={tokens} />
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
