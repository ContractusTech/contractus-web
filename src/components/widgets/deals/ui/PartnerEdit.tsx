import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
  title,
  onSave
}: EditAddressButton) => {
  const [open, setOpen] = useState(false)

  const { register, handleSubmit } = useForm<{ value: string }>()

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
        {title && <CreateDealHeader title={title} />}
        <div className="flex flex-col gap-[20px] p-[20px]">
          <Input register={register('value')} name="value" />
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
