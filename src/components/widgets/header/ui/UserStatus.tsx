import Image from 'next/image'
import Link from 'next/link'

import { useBalance } from '@/api/hooks/useBalance'
import { useUser } from '@/api/hooks/useUser'
import { getCtusBsc, getCtusSolana } from '@/app/constants/getCTUSUrls'
import { CrownIcon } from '@/assets/svg/CrownIcon'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { CreateDealHeader } from '../../deals/ui/CreateDealHeader'

export const UserStatus = () => {
  const { balance } = useBalance()
  const { user } = useUser()

  return (
    <Dialog>
      <DialogTrigger>
        {balance?.tier === 'holder' ? (
          <Button
            variant="default"
            className="group flex h-25 items-center rounded-[7px] bg-blue px-12 py-6 text-[12px] text-secondary-foreground shadow-[0px_1px_0px_0px_#2F4AAB] hover:bg-white/90 hover:text-secondary"
          >
            <CrownIcon className="mr-4 h-16 w-16 text-secondary-foreground transition duration-200 group-hover:text-secondary" />
            Holder mode
          </Button>
        ) : (
          <Button
            variant={'outline'}
            className="flex h-25 items-center rounded-[7px] border-[#fff] px-12 py-6 text-[12px] text-secondary-foreground"
          >
            Basic
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-scroll">
        <CreateDealHeader title="About tiers" />
        <div>
          <div className="relative h-[337px] w-full">
            <Image
              src={'/holder-mode-image.svg'}
              fill
              alt="holder mode"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-[16px] p-[20px]">
            <div className="flex flex-col gap-[16px]">
              <p className="text-[21px]">Basic</p>
              <span className="text-[15px]">
                Allows you to use the application without restrictions, but
                transactions are carried out with commissions.
              </span>
            </div>

            <div className="flex flex-col gap-[16px]">
              <p className="text-[21px]">Holder mode</p>
              <span className="text-[15px]">
                If you have 10.000 $CTUS and more on your balance, you can
                create transactions without commission. During the transaction
                this 10k CTUS is blocked in the smart contract and will be
                returned when the transaction is completed or canceled.
              </span>
              <p className="text-[15px] text-[#656975]">
                For example: if you need to make 2 deals without commission, you
                need to have 20k CTUS with 10k for each transaction.
              </p>
            </div>

            <Link
              className="text-md inline-flex h-38 items-center justify-center rounded-[12px] bg-primary px-20 py-10 font-medium tracking-tight text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              href={user?.blockchain === 'bsc' ? getCtusBsc : getCtusSolana}
              target="_blank"
            >
              Buy CTUS
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
