import * as Form from '@radix-ui/react-form'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { api } from '@/api/client'
import { Deal, Tokens } from '@/api/generated-api'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import Tag from '@/components/ui/tag'

import { SelectTokens } from '../../tokens'
import { CreateDealHeader } from './CreateDealHeader'

export const AmountChange = ({ deal }: { deal: Deal }) => {
  const [dialogOpened, setDialogOpened] = useState(false)
  const [token, setToken] = useState<Tokens[number]>()

  const { register, handleSubmit, watch, setValue } = useForm<Deal>({
    defaultValues: {
      amount: deal.amount,
      token: { address: deal.token?.address, code: deal.token?.code }
    }
  })

  const amountValue = watch('amount')
  const tokenlabel = watch('token.code')

  function handleTokenChange(token: Tokens[number]) {
    setToken(token)
    setValue('token', { address: token.address, code: token.code })
  }

  useEffect(() => {
    if (deal.token) {
      setValue('token', { address: deal.token.address, code: deal.token.code })
    }
  }, [deal.token, setValue])

  const handleAmountSettingsSave = handleSubmit(async data => {
    try {
      if (!data.token?.address || !data.token?.code) {
        throw new Error('Invalid token')
      }

      await api.deals.dealsCreate2(deal.id, {
        amount: {
          value: data.amount,
          token: { address: data.token?.address, code: data.token?.code }
        }
      })

      setDialogOpened(false)
    } catch {}
  })

  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <DialogTrigger asChild>
        <Button size={'sm'}>Change</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[600px] rounded-[10px] bg-[#070708] px-[18px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.85)]">
        <CreateDealHeader title="Change amount" />

        <Form.Root className="flex flex-col gap-[20px] py-[18px]">
          <Input
            register={register('amount')}
            type="number"
            name="amount"
            rightSlot={
              <SelectTokens
                selectable
                onSelect={handleTokenChange}
                trigger={
                  <button className="flex h-[70%] items-center justify-center gap-[4px] border-l-[1px] border-[#2A2E37] pl-[8px]">
                    <span className="text-[#5a606d]" key={token?.code}>
                      {tokenlabel}
                    </span>
                    <Menu color="#5a606d" className="mt-[4px]" />
                  </button>
                }
              />
            }
          />

          <div className="w-full rounded-[13px] border-[1px] border-solid border-[#2A2E37]">
            <div className="flex items-center justify-between gap-[13px] p-[18px]">
              <span>Holder mode</span>
              <Switch />
            </div>

            <div className="flex flex-col gap-[13px] border-t border-t-[#2A2E37] p-[18px]">
              <div className="flex items-center justify-between gap-[13px]">
                <span>Service fee</span>
                <Tag>Free</Tag>
              </div>
              <span>
                The fee is calculated from the amount of the transaction and the
                cost of the verfification service of result
              </span>
            </div>
          </div>

          <div className="flex justify-between gap-[13px]">
            <span>Total amount</span>
            <span className="font-[700] text-[#fff]">
              {amountValue} {tokenlabel}
            </span>
          </div>

          <Button className="self-end" onClick={handleAmountSettingsSave}>
            Save
          </Button>
        </Form.Root>
      </DialogContent>
    </Dialog>
  )
}
2
