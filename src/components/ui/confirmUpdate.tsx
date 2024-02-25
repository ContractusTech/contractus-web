import { XCircle } from 'lucide-react'

import { CreateDealHeader } from '../widgets/deals/ui/CreateDealHeader'
import { Button } from './button'
import { Dialog, DialogContent, DialogTrigger } from './dialog'

export const ConfirmUpdate = ({
  onOk,
  open,
  setIsOpen
}: {
  onOk: () => void
  open: boolean
  setIsOpen: (val: boolean) => void
}) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <button className="ml-[auto] cursor-pointer">
          <XCircle fill="#8D92A1" color="#15151b" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[280px]">
        <CreateDealHeader title="Already signed" />

        <div className="flex flex-col gap-[20px] p-[10px]">
          <span>
            Once the deal has been updated, all participants must re-sign the
            agreement.
          </span>

          <div className="flex justify-between">
            <Button variant={'destructive'} onClick={onOk}>
              Continue
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
