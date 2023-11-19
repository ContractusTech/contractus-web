import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'

const FormSchema = z.object({
  CTUS: z.boolean().default(false),
  USDC: z.boolean(),
  SOL: z.boolean(),
  FTMet: z.boolean(),
  GCT: z.boolean()
})

export const TokensList: FC = () => {
  const FORM_DATA = [
    {
      name: 'Contractus',
      slug: 'CTUS',
      icon: '/contractus.png',
      value: false
    },
    {
      name: 'USD Coin',
      slug: 'USDC',
      icon: '/usd.png',
      value: false
    },
    {
      name: 'Solana',
      slug: 'SOL',
      icon: '/solana.png',
      value: false
    },
    {
      name: 'Fantom Token',
      slug: 'FTMet',
      icon: '/phantom.png',
      value: false
    },
    {
      name: 'GateChainToken (Portal)',
      slug: 'GCT',
      icon: '/gatechain.png',
      value: false
    }
  ]

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      USDC: false,
      SOL: false,
      FTMet: false,
      GCT: false
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You choose:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
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
              {FORM_DATA &&
                FORM_DATA.map(formData => (
                  <FormField
                    key={formData.slug}
                    control={form.control}
                    name={
                      formData.slug as 'CTUS' | 'USDC' | 'SOL' | 'FTMet' | 'GCT'
                    }
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between border-b-[1.5px] border-border py-15">
                        <div className="flex items-center gap-x-24">
                          <div className="flex h-32 w-32 items-center justify-center">
                            <Image
                              src={formData.icon}
                              width={32}
                              height={32}
                              alt={formData.slug}
                            ></Image>
                          </div>
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              {formData.name}
                            </FormLabel>
                            <FormDescription className="text-[12px]">
                              {formData.slug}
                            </FormDescription>
                          </div>
                        </div>

                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
