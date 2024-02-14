import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'

import { api } from '@/api/client'
import { useDeal } from '@/api/hooks/useDeal'
import { useRolesStore } from '@/app/store/roles-store'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { CreateDealHeader } from './CreateDealHeader'

export const EditDeadline = () => {
  const { deal, refetchDeal } = useDeal()

  const [dialogOpened, setDialogOpened] = useState(false)

  const { iClient } = useRolesStore()
  const [selected, setSelected] = useState<Date>()

  const handleDeadlineChange = async (day: Date | undefined) => {
    setSelected(day)
  }

  const handleSaveDeadline = async () => {
    if (selected && deal) {
      await api.deals.dealsCreate2(deal.id, {
        deadline: selected?.toISOString()
      })

      await refetchDeal()

      setDialogOpened(false)
    }
  }

  useEffect(() => {
    if (deal?.deadline) {
      setSelected(new Date(deal.deadline))
    }
  }, [deal])

  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <DialogTrigger asChild>
        <Button
          variant={'tertiary'}
          data-tooltip-id={!iClient ? 'only-client' : ''}
          disabled={!iClient}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[fit-content] max-w-[600px] rounded-[10px] bg-[#070708] px-[18px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.85)]">
        <CreateDealHeader title="Change deadline" />

        <DayPicker
          selected={selected}
          onSelect={handleDeadlineChange}
          mode="single"
        />

        <Button onClick={handleSaveDeadline}>Apply</Button>
      </DialogContent>
    </Dialog>
  )
}
