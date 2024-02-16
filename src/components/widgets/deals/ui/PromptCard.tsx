import { AiPrompts } from '@/api/generated-api'
import { Button } from '@/components/ui/button'

export const PromptCard = ({
  prompt,
  onUse
}: {
  prompt: AiPrompts[number]
  onUse?: (val: string) => void
}) => {
  return (
    <div className="flex h-[104px] flex-col gap-[10px] rounded-[20px] border border-[#191A1E] p-[12px]">
      <span className="text-[15px] text-[#EBEBEF]">{prompt.text}</span>
      <Button
        className="self-start"
        size={'sm'}
        variant={'tertiary'}
        onClick={() => onUse && onUse(prompt.text)}
      >
        Use it
      </Button>
    </div>
  )
}
