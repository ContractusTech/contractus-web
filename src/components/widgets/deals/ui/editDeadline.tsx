import { useState } from 'react'
import { DayPicker } from 'react-day-picker'

import { api } from '@/api/client'
import { Deal } from '@/api/generated-api'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { CreateDealHeader } from './CreateDealHeader'

type EditDeadlineProps = {
  deal: Deal
}

export const EditDeadline = ({ deal }: EditDeadlineProps) => {
  const [dialogOpened, setDialogOpened] = useState(false)

  const [selected, setSelected] = useState<Date>()

  const handleDeadlineChange = async (day: Date | undefined) => {
    if (day) {
      setSelected(day)
      await api.deals.dealsCreate2(deal.id, {
        deadline: selected?.toISOString()
      })
    }
  }
  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <DialogTrigger asChild>
        <Button size={'sm'}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="w-[fit-content] max-w-[600px] rounded-[10px] bg-[#070708] px-[18px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.85)]">
        <CreateDealHeader title="Change deadline" />

        <DayPicker
          selected={selected}
          onSelect={handleDeadlineChange}
          mode="single"
        />
      </DialogContent>
    </Dialog>
  )
}
