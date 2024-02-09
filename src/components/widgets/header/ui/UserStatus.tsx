import { useBalance } from '@/api/hooks/useBalance'
import { CrownIcon } from '@/assets/svg/CrownIcon'
import { Button } from '@/components/ui/button'

export const UserStatus = () => {
  const { balance } = useBalance()

  if (balance?.tier === 'holder') {
    return (
      <Button
        variant="default"
        className="group flex h-25 items-center rounded-[7px] bg-blue px-12 py-6 text-[12px] text-secondary-foreground shadow-[0px_1px_0px_0px_#2F4AAB] hover:bg-white/90 hover:text-secondary"
      >
        <CrownIcon className="mr-4 h-16 w-16 text-secondary-foreground transition duration-200 group-hover:text-secondary" />
        Holder mode
      </Button>
    )
  }

  return (
    <Button
      variant={'outline'}
      className="flex h-25 items-center rounded-[7px] border-[#fff] px-12 py-6 text-[12px] text-secondary-foreground"
    >
      Basic
    </Button>
  )
}
