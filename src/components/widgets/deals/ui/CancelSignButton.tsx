import { useState } from 'react'

import { Tx } from '@/api/generated-api'
import { useDeal } from '@/api/hooks/useDeal'
import httpClient from '@/api/httpClient'
import { ERRORS } from '@/app/constants/errors'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { CreateDealHeader } from './CreateDealHeader'

export const CancelSignButton = () => {
  const { deal, refetchDeal } = useDeal()
  const [opened, setOpened] = useState(false)

  const cancelDeal = async () => {
    try {
      if (!deal) {
        throw new Error(ERRORS.DEAL_EXISTS)
      }

      const { data: tx } = await httpClient<Tx>({
        url: `deals/${deal.id}/tx/DEAL_INIT?silent=0`,
        method: 'GET'
      })

      if (!tx.transaction) {
        throw new Error(ERRORS.TX_EXISTS)
      }

      await httpClient({
        url: `deals/${deal.id}/tx/DEAL_INIT/sign`,
        method: 'DELETE',
        data: {
          transaction: tx.transaction
        }
      })

      await refetchDeal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <Dialog open={opened} onOpenChange={setOpened}>
        <DialogTrigger>
          <Button className="w-full" variant={'destructive-2'}>
            Cancel sign
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[270px]">
          <CreateDealHeader title={'Confirm'} />

          <div className="flex flex-col gap-[20px] p-[20px]">
            <span>Are you sure you want to cancel the deal?</span>

            <div className="flex justify-end gap-[10px]">
              <Button size={'sm'}>Close</Button>
              <Button size={'sm'} variant={'destructive'} onClick={cancelDeal}>
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
