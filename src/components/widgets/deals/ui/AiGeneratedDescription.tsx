import 'swiper/css'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ArrowBack } from '@mui/icons-material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Swiper, SwiperSlide } from 'swiper/react'

import { usePrompts } from '@/api/hooks/usePrompts'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { CreateDealHeader } from './CreateDealHeader'
import { PromptCard } from './PromptCard'

export const AiGeneratedDescription = () => {
  const { register, handleSubmit } = useForm<{ text: string }>()
  const [parent] = useAutoAnimate()
  const [promptsShowed, setPromptsShowed] = useState(true)

  const { prompts } = usePrompts()

  const handleGenerate = handleSubmit(async data => {
    console.log(data)
  })

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={'sm'}>Ai gen</Button>
      </DialogTrigger>
      <DialogContent>
        <CreateDealHeader title="Deal description" />
        <div className="p-[16px]">
          <div className="flex flex-col gap-[16px]" ref={parent}>
            <Input
              variant="textarea"
              name="text"
              register={register('text', { required: true })}
            />
            <div className="flex justify-between gap-[10px]">
              <Button
                size={'sm'}
                variant={'secondary'}
                onClick={() => setPromptsShowed(val => !val)}
              >
                <div className="flex items-center gap-[8px]">
                  {promptsShowed ? 'Hide prompts' : 'Show prompts'}

                  <ArrowBack
                    className={`rotate-[${
                      promptsShowed ? '' : '-'
                    }90deg] transition-all`}
                  />
                </div>
              </Button>
              <Button size={'sm'} onClick={handleGenerate}>
                Generate
              </Button>
            </div>

            {prompts && promptsShowed && (
              <div className="min-w-[0]">
                <Swiper slidesPerView={2.3} spaceBetween={12}>
                  {prompts.map(prompt => (
                    <SwiperSlide key={prompt.text}>
                      <PromptCard prompt={prompt} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
        <div className="h-[1px] w-full bg-[##1B1E25]"></div>

        <div className="flex flex-col gap-[16px] p-[16px]">
          <div className="flex justify-between gap-[10px]">
            <span className="text-[15px] text-[#656975]">Ai result</span>

            <Button size={'sm'}>Paste in deal</Button>
          </div>

          <div className="rounded-[20px] bg-[#191A1E] p-[16px]">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              voluptatem, distinctio ipsa culpa quis ex officiis quaerat aperiam
              nostrum, error, possimus similique! Placeat expedita quo ipsa
              itaque porro est ut. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Labore similique quae nostrum saepe mollitia
              doloremque debitis, fuga, et rem tenetur esse totam autem
              temporibus eveniet aspernatur repellat adipisci! Nam, quas? Libero
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
