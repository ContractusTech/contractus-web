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
  size?: 'md' | 'l'
  centered?: boolean
  disabled?: boolean
}

export const Input = ({
  name,
  placeholder,
  register,
  variant,
  rightSlot,
  type,
  size,
  centered,
  disabled
}: InputProps) => {
  const fieldHeight = useMemo(() => {
    return variant === 'textarea'
      ? 'h-[150px]'
      : size === 'l'
      ? 'h-[55px]'
      : 'h-[35px]'
  }, [variant])

  if (!register) {
    return null
  }

  return (
    <Form.Field name={name} className="grid">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
          {placeholder}
        </Form.Label>
      </div>
      <div
        className={`flex ${fieldHeight} w-full items-center justify-center rounded-[4px] bg-[#15151A] px-[10px] text-[15px] leading-none text-white   outline-none`}
      >
        <Form.Control asChild>
          {variant === 'textarea' ? (
            <textarea
              {...register}
              disabled={disabled}
              className="h-[100%] flex-grow resize-none bg-transparent p-[12px_8px]"
            />
          ) : (
            <input
              {...register}
              disabled={disabled}
              type={type ?? 'text'}
              className={`h-[100%] flex-grow bg-transparent ${
                size === 'l' && 'text-[30px]'
              } ${centered && 'text-center'}`}
            />
          )}
        </Form.Control>
        {rightSlot}
      </div>
    </Form.Field>
  )
}
