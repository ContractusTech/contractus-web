import CryptoJS from 'crypto-js'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { api } from '@/api/client'
import { Deal } from '@/api/generated-api'
import { useDeal } from '@/api/hooks/useDeal'
import { PROMPTS } from '@/app/constants/prompts'
import { useRolesStore } from '@/app/store/roles-store'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useCustomPrompt } from '@/providers/DealChangeAlert'

import { AiGeneratedDescription } from './AiGeneratedDescription'
import { CreateDealHeader } from './CreateDealHeader'

export const EditDescription = () => {
  const { deal } = useDeal()
  const [dialogOpened, setDialogOpened] = useState(false)
  const { signedByChecker, signedByClient, signedByExecutor } = useRolesStore()
  const { requestPrompt } = useCustomPrompt()

  const { register, handleSubmit } = useForm<Deal>({
    defaultValues: {
      meta: { content: { text: atob(deal?.meta?.content?.text ?? '') } }
    }
  })

  const handleSaveComment = handleSubmit(async data => {
    try {
      if ([signedByChecker, signedByClient, signedByExecutor].includes(true)) {
        const res = await requestPrompt(PROMPTS.CONFIGN_UNSIGN)

        if (!res) {
          return
        }
      }

      if (!deal) {
        throw new Error('No deal')
      }

      if (data.meta?.content) {
        const text = data.meta?.content?.text

        if (!text) {
          throw new Error('Invalid text')
        }

        api.deals.metaCreate(deal.id, {
          updatedAt: new Date().toISOString(),
          meta: {
            content: {
              text: btoa(text),
              md5: CryptoJS.MD5(text).toString()
            },
            files: deal?.meta?.files
          }
        })
      }

      setDialogOpened(false)
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <DialogTrigger>
        <Button
          data-tooltip-id={!!deal?.encryptedSecretKey ? 'encrypted' : ''}
          disabled={!!deal?.encryptedSecretKey}
          variant={'tertiary'}
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-[607px]"
        onInteractOutside={e => e.preventDefault()}
      >
        <CreateDealHeader title="Deal description" />

        <div className=" flex flex-col gap-[24px] p-[16px]">
          <div className="overflow-hidden rounded-[20px] bg-[#15151b]">
            <div className="flex w-full rounded-[20px_20px_0_0] p-[10px] ">
              <div className="flex gap-[24px]"></div>
              <div className="ml-[auto]">
                <AiGeneratedDescription />
              </div>
            </div>
            <div className="w-fill h-[1px] bg-[#2A2C34]"></div>
            <Input
              size="l"
              variant="textarea"
              name="text"
              register={register('meta.content.text')}
            />
          </div>
          <Button className="self-end" onClick={handleSaveComment}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
