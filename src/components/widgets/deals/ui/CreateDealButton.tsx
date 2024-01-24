import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

import { api } from '@/api/client'
import { PAGES } from '@/app/constants/pages'
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

  const router = useRouter()

  const handleCreate = async () => {
    try {
      const newDeal = await api.deals.dealsCreate({
        completionCheckType: completionCheckType as 'NONE' | 'CHECKER',
        role: currentRole,
        performanceBondType: performanceBondType as PerformanceBondType
      })

      if (newDeal) {
        setOpen(false)
        router.push(PAGES.DEAL((newDeal as any).id))
        onSuccess && onSuccess()
      }
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
        <div className="flex flex-col gap-[22px] px-[35px] pb-[30px] pt-[40px] md:px-[15px] md:pb-[15px]">
          <h2 className="mb-4 text-lg font-semibold">Select your role</h2>

          <div className="flex space-x-[15px]">
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

          <div className="flex items-center justify-between pb-24 pt-24">
            <div className="flex flex-col">
              <span className="pb-4 font-[600] text-[#fff]">
                Check by third party
              </span>

              <span className="pr-16 text-sm font-[400] text-[#656975]">
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
            <div className="flex flex-col">
              <span className="pb-4 text-base font-[500] text-[#fff]">
                Who will add the performance bond?
              </span>
              <span className="pr-24 text-sm font-[400] text-[#656975]">
                If you want to protect against unilateral termination <br />
                of the deal, you can put up collateral.
              </span>
            </div>
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
