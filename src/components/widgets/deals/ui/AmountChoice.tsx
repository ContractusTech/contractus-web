import { useAutoAnimate } from '@formkit/auto-animate/react'
import * as Form from '@radix-ui/react-form'
import { Menu } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formatUnits } from 'viem'

import { api } from '@/api/client'
import { Tokens } from '@/api/generated-api'
import { useBalance } from '@/api/hooks/useBalance'
import { useTokens } from '@/api/hooks/useTokens'
import { Amount, DealFee, Token } from '@/app/types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Tag from '@/components/ui/tag'
import { getDecimalOfShortToken, getInnativeTokens } from '@/lib/utils'

import { SelectTokens } from '../../tokens'
import { CreateDealHeader } from './CreateDealHeader'

type AmountChoiceProps = {
  withFee?: boolean
  feeDealid?: string
  checker?: boolean
  defaultAmount?: Amount
  dealAmount?: string
  dealToken?: Token
  onSelect?: (amount: Amount) => void
  disabled?: boolean
}

const getFeeString = (fee: DealFee) =>
  formatUnits(BigInt(fee.feeAmount.value), fee.feeAmount.token.decimals)

export const AmountChoice = ({
  defaultAmount,
  onSelect,
  withFee,
  feeDealid,
  checker,
  dealAmount,
  dealToken,
  disabled
}: AmountChoiceProps) => {
  const { tokens } = useTokens()
  const { balance } = useBalance()
  const [dialogOpened, setDialogOpened] = useState(false)
  const [fee, setFee] = useState<DealFee | null>(null)
  const [parent] = useAutoAnimate()

  if ((!defaultAmount && (!tokens || tokens.length === 0)) || !tokens) {
    throw new Error('Error on try set default token value on form')
  }

  const getDefaultValue = (): Amount => {
    if (defaultAmount) {
      return {
        token: defaultAmount.token,
        value: formatUnits(
          BigInt(defaultAmount.value),
          getDecimalOfShortToken(defaultAmount.token, tokens)
        )
      }
    } else if (tokens) {
      const token = tokens[1]
      return { token: { address: token.address, code: token.code }, value: '0' }
    } else {
      throw new Error('Error on set default token value')
    }
  }

  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<Amount>({
      defaultValues: getDefaultValue()
    })

  const innativeTokens = useMemo(() => getInnativeTokens(tokens), [tokens])

  const handleSelectAmount = handleSubmit(amountData => {
    onSelect && onSelect(amountData)
    setDialogOpened(false)
  })

  const amountValue = watch('value')
  const tokenlabel = watch('token')

  function handleTokenChange([token]: Tokens) {
    setValue('token', { address: token.address, code: token.code })
  }

  const fetchFee = useCallback(async () => {
    const amount = getValues()

    if (feeDealid && withFee && amount) {
      const fee = await api.deals.postDeals(feeDealid, {
        type: checker ? 'CHECKER' : 'DEAL',
        currency: 'USD',
        amount: {
          value: Number(!!amount.value ? amount.value : '0').toFixed(0),
          token: amount.token
        }
      })

      setFee(fee as unknown as DealFee)
    }
  }, [])

  const totalAmount = useMemo(() => {
    const numberAmount = Number.parseFloat(!!amountValue ? amountValue : '0')
    if (fee) {
      const numberFee = Number.parseFloat(getFeeString(fee))
      return numberAmount + numberFee
    } else {
      return numberAmount
    }
  }, [amountValue, fee])

  useEffect(() => {
    if (dialogOpened) {
      fetchFee()
    }
  }, [dialogOpened, amountValue])

  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          variant={'tertiary'}
          data-tooltip-id={
            disabled ? `only-client${checker ? '-checker' : ''}` : ''
          }
        >
          {checker ? 'Fee' : 'Edit'}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[600px] rounded-[10px] bg-[#070708] px-[18px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.85)]">
        <CreateDealHeader title="Change amount" />

        <Form.Root className="flex flex-col gap-[20px] py-[18px]" ref={parent}>
          <Input
            register={register('value')}
            type="number"
            name="amount"
            size="l"
            rightSlot={
              <SelectTokens
                tokens={innativeTokens}
                onSelect={handleTokenChange}
                trigger={
                  <button className="flex h-[70%] items-center justify-center gap-[4px] border-l-[1px] border-[#2A2E37] pl-[8px]">
                    <span className="text-[#5a606d]" key={tokenlabel.address}>
                      {tokenlabel.code}
                    </span>
                    <Menu color="#5a606d" className="mt-[4px]" />
                  </button>
                }
              />
            }
          />

          {fee && withFee && (
            <>
              <div className="w-full rounded-[13px] border-[1px] border-solid border-[#2A2E37]">
                {dealAmount && dealToken && (
                  <div className="flex items-center justify-between gap-[13px] border-b border-b-[#2A2E37] p-[18px]">
                    <span>Amount of deal</span>
                    <span>
                      {formatUnits(BigInt(dealAmount), dealToken.decimals)}{' '}
                      {dealToken.code}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-[13px] p-[18px]">
                  <span>Holder mode</span>
                  {balance?.tier === 'basic' ? (
                    <Tag>Off</Tag>
                  ) : (
                    <Tag type="owner">On</Tag>
                  )}
                </div>

                <div className="flex flex-col gap-[13px] border-t border-t-[#2A2E37] p-[18px]">
                  <div className="flex items-center justify-between gap-[13px]">
                    <span>Service fee</span>

                    {fee.allowHolderMode ? (
                      <Tag>Free</Tag>
                    ) : (
                      `${getFeeString(fee)} ${fee.feeAmount.token.code}`
                    )}
                  </div>
                  <span>
                    The fee is calculated from the amount of the transaction and
                    the cost of the verfification service of result
                  </span>
                </div>
              </div>

              <div className="flex justify-between gap-[13px]">
                <span>Total amount</span>
                <span className="font-[700] text-[#fff]">
                  {totalAmount} {tokenlabel.code}
                </span>
              </div>
            </>
          )}

          <Button className="self-end" onClick={handleSelectAmount}>
            Save
          </Button>
        </Form.Root>
      </DialogContent>
    </Dialog>
  )
}
