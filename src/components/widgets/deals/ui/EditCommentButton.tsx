import CryptoJS from 'crypto-js'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { api } from '@/api/client'
import { Deal } from '@/api/generated-api'
import { useDeal } from '@/api/hooks/useDeal'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { CreateDealHeader } from './CreateDealHeader'

export const EditCommentButton = ({
  type,
  edit
}: {
  type: 'result' | 'meta'
  edit?: boolean
}) => {
  const { deal } = useDeal()
  const [dialogOpened, setDialogOpened] = useState(false)

  const { register, handleSubmit } = useForm<Deal>({
    defaultValues: {
      [type]: { content: { text: deal?.[type]?.content?.text } }
    }
  })

  const handleSaveComment = handleSubmit(async data => {
    try {
      if (!deal) {
        throw new Error('No deal')
      }

      if (data[type]?.content) {
        const text = data[type]?.content?.text

        if (!text) {
          throw new Error('Invalid text')
        }

        api.deals[`${type}Create`](deal.id, {
          updatedAt: new Date().toISOString(),
          [type]: {
            content: {
              text,
              md5: CryptoJS.MD5(text).toString()
            },
            files: deal?.[type]?.files
          }
        })
      }

      setDialogOpened(false)
    } catch {}
  })

  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <DialogTrigger asChild>
        <Button
          data-tooltip-id={!!deal?.encryptedSecretKey ? 'encrypted' : ''}
          variant={'tertiary'}
          disabled={!!deal?.encryptedSecretKey}
        >
          {edit ? 'Edit' : 'View'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[607px]">
        <div className="flex flex-col gap-[13px]">
          <CreateDealHeader title={edit ? 'Edit comment' : 'View comment'} />
          <Input
            variant="textarea"
            register={register(`${type}.content.text`)}
            name="text"
            size="l"
            disabled={!edit}
          />
          {edit && (
            <Button className=" self-end" onClick={handleSaveComment}>
              Save
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
