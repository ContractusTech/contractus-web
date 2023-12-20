import { FC, useState } from 'react'

import { api } from '@/api/client'
import { PerformanceBondType, Role } from '@/app/types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

import { CreateDealHeader } from './CreateDealHeader'
import { RoleCard } from './RoleCard'

type Props = {
  onSuccess?: () => void
}

const PERFORMANCES_BOND: { value: PerformanceBondType; label: string }[] = [
  {
    value: 'NONE',
    label: 'None'
  },
  {
    value: 'BOTH',
    label: 'Both'
  },
  {
    value: 'ONLY_CLIENT',
    label: 'Only client'
  },
  {
    value: 'ONLY_EXECUTOR',
    label: 'Only executor'
  }
]

export const CreateDealButton: FC<Props> = ({ onSuccess }) => {
  const [open, setOpen] = useState(false)

  const [currentRole, setCurrentRole] = useState<Role>('CLIENT')
  const [performanceBondType, setPerformanceBondType] = useState<string>('NONE')
  const [completionCheckType, setCompletionCheckType] = useState<string>('NONE')

  const handleCreate = async () => {
    try {
      await api.deals.dealsCreate({
        completionCheckType: completionCheckType as 'NONE' | 'CHECKER',
        role: currentRole,
        performanceBondType: performanceBondType as PerformanceBondType
      })

      setOpen(false)
      onSuccess && onSuccess()
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create new</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[600px] rounded-[10px] bg-[#070708] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.85)]">
        <CreateDealHeader title="New deal" />
        <div className="flex flex-col gap-[22px] px-[35px] pb-[30px] pt-[40px]">
          <h2 className="mb-4 text-lg font-semibold">Select your role</h2>

          <div className="flex gap-[50px]">
            <RoleCard
              type="CLIENT"
              onClick={setCurrentRole}
              active={currentRole === 'CLIENT'}
            />
            <RoleCard
              type="EXECUTOR"
              onClick={setCurrentRole}
              active={currentRole === 'EXECUTOR'}
            />
          </div>

          <div className="flex items-center rounded-[13px] border-[1px] border-solid border-[#656975] px-[24px] py-[21px]">
            <div className="flex flex-col">
              <span className="font-[600] text-[#fff]">
                Check by third party
              </span>

              <span className="font-[500] text-[#656975]">
                The decision to complete the deal will be made by a third party.
              </span>
            </div>

            <Switch
              onCheckedChange={val =>
                setCompletionCheckType(val ? 'CHECKER' : 'NONE')
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-[600] text-[#fff]">
              Who will add the performance bond?
            </span>

            <Select
              list={PERFORMANCES_BOND}
              onChange={setPerformanceBondType}
            />
          </div>

          <Button className="mt-[20px] self-end" onClick={handleCreate}>
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
