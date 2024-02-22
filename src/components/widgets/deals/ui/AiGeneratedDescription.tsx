import 'swiper/css'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ArrowBack } from '@mui/icons-material'
import { AxiosError } from 'axios'
import { Copy, CopyCheckIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Swiper, SwiperSlide } from 'swiper/react'

import { usePrompts } from '@/api/hooks/usePrompts'
import httpClient from '@/api/httpClient'
import LoadingSpinner from '@/assets/svg/LoadingCircle'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { CreateDealHeader } from './CreateDealHeader'
import { PromptCard } from './PromptCard'

export const AiGeneratedDescription = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isDirty }
  } = useForm<{ text: string }>({ defaultValues: { text: '' } })
  const [promptsShowed, setPromptsShowed] = useState(true)
  const [aiValue, setAiValue] = useState('')
  const { prompts } = usePrompts()
  const [parent] = useAutoAnimate()

  const handleGenerate = handleSubmit(async data => {
    try {
      const { data: generatedData } = await httpClient<{ generated: string }>({
        url: 'ai/text-generate',
        method: 'POST',
        data
      })

      setAiValue(generatedData.generated)
    } catch (error) {
      const e = error as unknown as AxiosError<{ error: string }>
      const message = e.response?.data.error
      message && toast(message)
      console.error(error)
    }
  })

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    window.navigator.clipboard.writeText(aiValue)
    setCopied(true)

    setTimeout(() => setCopied(false), 4000)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={'sm'}>Ai gen</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh]  overflow-scroll rounded-[10px]">
        <CreateDealHeader title="Deal description" />
        <div ref={parent}>
          <div className="max-w-[607px]  p-[16px]">
            <div className="flex flex-col gap-[16px]">
              <Input
                placeholder="Enter contract description"
                variant="textarea"
                name="text"
                register={register('text', { required: true })}
              />
              <div className="flex justify-between gap-[10px]">
                <Button
                  size={'default'}
                  variant={'quaternary'}
                  onClick={() => setPromptsShowed(val => !val)}
                >
                  <div className="flex items-center gap-[8px]">
                    {promptsShowed ? 'Hide prompts' : 'Show prompts'}

                    <ArrowBack
                      className={`${
                        promptsShowed ? 'rotate-[90deg]' : 'rotate-[-90deg]'
                      } transition-all`}
                    />
                  </div>
                </Button>
                <Button
                  size={'lg'}
                  onClick={handleGenerate}
                  disabled={isSubmitting || !isDirty}
                >
                  <div className="flex items-center gap-[8px]">
                    Generate
                    {isSubmitting && (
                      <div className="mt-[2px]">
                        <LoadingSpinner color="#000" size={14} />
                      </div>
                    )}
                  </div>
                </Button>
              </div>

              {prompts && promptsShowed && (
                <div className="min-w-[0]">
                  <Swiper slidesPerView={2.3} spaceBetween={12}>
                    {prompts.map(prompt => (
                      <SwiperSlide key={prompt.text} className="!h-[auto]">
                        <PromptCard
                          prompt={prompt}
                          onUse={val =>
                            setValue('text', val, { shouldDirty: true })
                          }
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>
          </div>
          <div className="h-[1px] w-full bg-[##1B1E25]"></div>

          {aiValue && (
            <div className="flex flex-col gap-[16px] p-[16px]">
              <div className="flex justify-between gap-[10px]">
                <span className="text-[15px] text-[#656975]">Ai result</span>

                <Button
                  size={'default'}
                  onClick={handleCopy}
                  variant={'quaternary'}
                  className="gap-[8px]"
                >
                  {copied ? (
                    <>
                      Copied <CopyCheckIcon size={16} />
                    </>
                  ) : (
                    <>
                      Paste in deal
                      <Copy size={16} />
                    </>
                  )}
                </Button>
              </div>

              <div className="max-h-[300px] overflow-scroll rounded-[20px] bg-[#191A1E] p-[16px]">
                <span className="whitespace-break-spaces">{aiValue}</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
