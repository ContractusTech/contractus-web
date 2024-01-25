import CryptoJS from 'crypto-js'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { api } from '@/api/client'
import { Deal } from '@/api/generated-api'
import { useDealStore } from '@/app/store/deal-store'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { CreateDealHeader } from './CreateDealHeader'

export const EditCommentButton = () => {
  const { deal } = useDealStore()
  const [dialogOpened, setDialogOpened] = useState(false)

  const { register, handleSubmit } = useForm<Deal>({
    defaultValues: { result: { content: { text: deal?.meta?.content?.text } } }
  })

  const handleSaveComment = handleSubmit(data => {
    try {
      if (!deal) {
        throw new Error('No deal')
      }
      if (data.meta?.content) {
        api.deals.resultsCreate(deal.id, {
          updatedAt: new Date().toISOString(),
          result: {
            content: {
              text: data.meta?.content?.text,
              md5: CryptoJS.MD5(data.meta.content.text).toString()
            }
          }
        })
      }
      setDialogOpened(false)
    } catch {}
  })

  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <DialogTrigger asChild>
        <Button variant={'tertiary'}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-[13px]">
          <CreateDealHeader title="Edit comment" />
          <Input
            variant="textarea"
            register={register('meta.content.text')}
            name="text"
          />
          <Button className=" self-end" onClick={handleSaveComment}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
