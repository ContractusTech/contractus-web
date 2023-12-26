import * as SelectRadix from '@radix-ui/react-select'
import classnames from 'classnames'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import React from 'react'

type SelectItemProps = {
  children: React.ReactNode
  className?: string
  value: string
}

type SelectProps = {
  list: { value: any; label: string }[]
  onChange: (value: string) => void
}

const SelectItem = ({ children, className, ...props }: SelectItemProps) => {
  return (
    <SelectRadix.Item
      className={classnames(
        'text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none',
        className
      )}
      {...props}
    >
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    </SelectRadix.Item>
  )
}

export const Select = ({ list, onChange }: SelectProps) => {
  return (
    <SelectRadix.Root defaultValue={list[0].value} onValueChange={onChange}>
      <SelectRadix.Trigger
        className="text-violet11 hover:bg-mauve3 data-[placeholder]:text-violet9 inline-flex h-[42px] items-center justify-center gap-[5px] rounded-[13px] bg-[#15151A] px-[20px] text-[12px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        aria-label="Food"
      >
        <SelectRadix.Value placeholder="Select" />
        <SelectRadix.Icon className="text-violet11">
          <ChevronDownIcon />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>
      <SelectRadix.Portal>
        <SelectRadix.Content className="relative z-[100] overflow-hidden rounded-md bg-[#15151A] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <SelectRadix.ScrollUpButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-[#15151A]">
            <ChevronUpIcon />
          </SelectRadix.ScrollUpButton>
          <SelectRadix.Viewport className="p-[5px]">
            {list.map(item => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectRadix.Viewport>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  )
}
