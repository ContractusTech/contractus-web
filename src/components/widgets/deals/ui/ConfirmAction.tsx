import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import { CreateDealHeader } from './CreateDealHeader'

export const ConfirmAction = ({
  message,
  onClose,
  open
}: {
  message?: string
  onClose: (res: boolean) => void
  open: boolean
}) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-[420px]">
          <CreateDealHeader title={'Already signed'} />

          <div className="flex flex-col gap-[20px] p-[10px]">
            <span>{message}</span>

            <div className="flex justify-end gap-[10px]">
              <Button onClick={() => onClose(true)}>Continue</Button>
              <Button onClick={() => onClose(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <span className="text-center text-[13px] text-[#AD4C4C]">
        You can cancel the deal before it starts.
      </span>
    </div>
  )
}
