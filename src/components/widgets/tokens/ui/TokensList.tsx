import Image from 'next/image'
import { FC } from 'react'

import { TokenWithChecked } from '@/app/types'
import { FormItem } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

type Props = {
  tokens: TokenWithChecked[]
  onSelect: (tokens: TokenWithChecked[]) => void
  onOneSelect: (token: TokenWithChecked) => void
  multiple?: boolean
}

export const TokensList: FC<Props> = ({
  tokens,
  onSelect,
  multiple,
  onOneSelect
}) => {
  const handleOneSelect = (token: TokenWithChecked) => {
    !multiple && onOneSelect(token)
  }

  const handleSelect = (val: boolean, token: TokenWithChecked) => {
    onSelect(
      tokens.map(selectedToken => ({
        ...selectedToken,
        checked: selectedToken.code === token.code ? val : selectedToken.checked
      }))
    )
  }

  return (
    <div className="space-y-4">
      {tokens.map(token => (
        <FormItem
          className={`flex ${
            !token.disabled && 'cursor-pointer'
          } flex-row items-center justify-between border-b-[1.5px] border-border py-15 transition-all  ${
            !multiple && 'hover:opacity-50'
          } ${token.disabled && 'opacity-[0.2]'}`}
          key={token.code}
          onClick={() => handleOneSelect(token)}
        >
          <div className="flex items-center gap-x-24">
            {token.logoURL && (
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-[6px]">
                <Image
                  src={token.logoURL}
                  width={32}
                  height={32}
                  alt={token.code}
                  priority
                />
              </div>
            )}
            <div className="space-y-0.5 flex flex-col">
              <span>{token.name}</span>
              <span className="text-[12px] text-[#656975]">{token.code}</span>
            </div>
          </div>

          {multiple && (
            <Switch
              disabled={token.disabled}
              onCheckedChange={val => handleSelect(val, token)}
              checked={token.checked}
            />
          )}
        </FormItem>
      ))}
    </div>
  )
}
