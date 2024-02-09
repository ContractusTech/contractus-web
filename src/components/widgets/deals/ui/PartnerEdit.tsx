import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUser } from '@/api/hooks/useUser'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { CreateDealHeader } from './CreateDealHeader'

type EditAddressButton = {
  triggerClassName?: string
  title?: string
  onSave?: (val: string) => void
}

export const PartnerEdit = ({
  triggerClassName,
  onSave
}: EditAddressButton) => {
  const [open, setOpen] = useState(false)

  const { user } = useUser()

  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm<{ value: string }>({})

  const handleSave = handleSubmit(data => {
    onSave && onSave(data.value)
    setOpen(false)
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={triggerClassName}>
        <Button variant={'tertiary'}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[600px] rounded-[10px] bg-[#070708] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.85)]">
        <CreateDealHeader title={'Edit partner'} />
        <div className="flex flex-col gap-[20px] p-[20px]">
          <div className="flex flex-col gap-[10px]">
            <span className="text-center text-[30px] font-[600]">
              Enter address
            </span>
            <span className="text-center text-[13px] text-[#656975]">
              Of the account who will perform the work under the contract.
            </span>
          </div>

          <div className="flex flex-col gap-[10px]">
            <Input
              centered
              register={register('value', {
                required: true,
                pattern:
                  user?.blockchain === 'solana'
                    ? {
                        value: /^([\dA-Za-z]{44})$/,
                        message: 'Input valid address for Solana'
                      }
                    : {
                        value: /^0x[\dA-Fa-f]{40}$/,
                        message: 'Input valid address for BSC'
                      }
              })}
              name="value"
              size="l"
            />
            <span className="text-center text-[13px] text-[#656975]">
              Account must be {user?.blockchain.toUpperCase()} blockchain
            </span>
          </div>
          <Button disabled={!isValid} onClick={handleSave}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
