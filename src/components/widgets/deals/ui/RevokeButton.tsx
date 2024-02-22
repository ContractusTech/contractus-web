import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useDeal } from '@/api/hooks/useDeal'
import httpClient from '@/api/httpClient'
import { ERRORS } from '@/app/constants/errors'
import { PAGES } from '@/app/constants/pages'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { CreateDealHeader } from './CreateDealHeader'

export const RevokeButton = () => {
  const { deal, refetchDeal } = useDeal()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleRevoke = async () => {
    if (!deal) {
      throw new Error(ERRORS.DEAL_EXISTS)
    }

    await httpClient({
      url: `deals/${deal.id}/cancel`,
      method: 'POST',
      data: {
        force: false
      }
    })

    await refetchDeal()

    router.push(PAGES.MAIN)
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button
            className="w-full"
            variant={'destructive'}
            onClick={() => setOpen(true)}
          >
            Revoke deal
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[270px]">
          <CreateDealHeader title={'Confirm'} />

          <div className="flex flex-col gap-[20px] p-[10px]">
            <span>Are you sure you want to revoke the deal?</span>

            <div className="flex justify-end gap-[10px]">
              <Button>Close</Button>
              <Button variant={'destructive'} onClick={handleRevoke}>
                Confirm
              </Button>
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
