import { XCircle } from 'lucide-react'
import { useState } from 'react'

import { CreateDealHeader } from '../widgets/deals/ui/CreateDealHeader'
import { Button } from './button'
import { Dialog, DialogContent, DialogTrigger } from './dialog'

export const FileDelete = ({ onDelete }: { onDelete: () => void }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="ml-[auto] cursor-pointer">
          <XCircle fill="#8D92A1" color="#15151b" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[280px]">
        <CreateDealHeader title="Confirm" />

        <div className="flex flex-col gap-[20px] p-[10px]">
          <span>Are you sure you want to delete the file?</span>

          <div className="flex justify-between">
            <Button variant={'destructive'} onClick={onDelete}>
              Yes, delete
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
