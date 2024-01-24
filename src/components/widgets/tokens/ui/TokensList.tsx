import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Tokens } from '@/api/generated-api'
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

type Props = {
  tokens: Tokens
  onSelect?: (token: Tokens[number]) => void
}

export const TokensList: FC<Props> = ({ tokens, onSelect }) => {
  const FormSchema = z.array(
    z.object({
      code: z.string(),
      address: z.string().or(z.null()),
      value: z.boolean().default(false)
    })
  )
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  function handleChange(val: boolean, token: Tokens[number]) {
    if (val) {
      onSelect && onSelect(token)
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-15 h-[70vh] w-full"
        >
          <div>
            <div className="space-y-4">
              {tokens.map(token => (
                <FormItem
                  className="flex flex-row items-center justify-between border-b-[1.5px] border-border py-15"
                  key={token.code}
                >
                  <div className="flex items-center gap-x-24">
                    {token.logoURL && (
                      <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-[6px]">
                        <Image
                          src={token.logoURL}
                          width={32}
                          height={32}
                          alt={token.code}
                        />
                      </div>
                    )}
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">{token.name}</FormLabel>
                      <FormDescription className="text-[12px]">
                        {token.code}
                      </FormDescription>
                    </div>
                  </div>

                  <FormControl>
                    <Switch onCheckedChange={val => handleChange(val, token)} />
                  </FormControl>
                </FormItem>
              ))}
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
