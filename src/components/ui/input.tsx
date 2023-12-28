import * as Form from '@radix-ui/react-form'
import { InputHTMLAttributes, useMemo } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type InputProps = {
  name: string
  placeholder?: string
  register: UseFormRegisterReturn
  variant?: 'input' | 'textarea'
  rightSlot?: React.ReactNode
  type?: InputHTMLAttributes<HTMLInputElement>['type']
}

export const Input = ({
  name,
  placeholder,
  register,
  variant,
  rightSlot,
  type
}: InputProps) => {
  const fieldHeight = useMemo(() => {
    return variant === 'textarea' ? 'h-[150px]' : 'h-[35px]'
  }, [variant])

  return (
    <Form.Field name={name} className="grid">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
          {placeholder}
        </Form.Label>
      </div>
      <div
        className={`flex ${fieldHeight} w-full items-center justify-center rounded-[4px] bg-[#15151A] px-[10px] text-[15px] leading-none text-white  shadow-[0_0_0_1px_black] outline-none`}
      >
        <Form.Control asChild>
          {variant === 'textarea' ? (
            <textarea
              {...register}
              className="h-[100%] flex-grow resize-none bg-transparent p-[12px_8px]"
            />
          ) : (
            <input
              {...register}
              type={type ?? 'text'}
              className="h-[100%] flex-grow bg-transparent"
            />
          )}
        </Form.Control>
        {rightSlot}
      </div>
    </Form.Field>
  )
}
