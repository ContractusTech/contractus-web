import { AddCircleIcon } from '@/assets/svg/AddCircleIcon'
import { ArrowUpOutlineIcon } from '@/assets/svg/ArrowUpOutlineIcon'
import { AppLogo } from '@/components/entities/logo/AppLogo'
import { UserOptions } from '@/components/features/user-options'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <header className="h-54 flex flex-shrink-0 flex-grow-0 items-center justify-between">
        <div className="mt-auto basis-[120px]">
          <AppLogo />
        </div>
        <div>Holder mode</div>
        <div className="basis-[120px]">
          <UserOptions />
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-[500px] flex-grow flex-col pt-20">
        <section className="mb-30">
          <div className="mb-13">
            <h1 className="typo-label text-center">Estimate balance</h1>
          </div>
          <h2 className="text-center text-[52px] leading-none text-primary">
            $54.00
          </h2>
        </section>

        <div className="mb-30 mx-auto flex gap-x-[13px]">
          <Button variant="secondary">
            <AddCircleIcon className="mr-4 h-16 w-16" />
            Buy
          </Button>
          <Button variant="secondary">
            <ArrowUpOutlineIcon className="mr-4 h-16 w-16" />
            Send
          </Button>
        </div>

        <section className="w-full border-t-[1px] border-border">
          <div className="py-13 px-15 mb-6 flex items-center justify-between">
            <h2 className="typo-label">TOKENS</h2>
          </div>

          <div className="py-18 mb-8 rounded-[16px] bg-secondary">
            <div className="border-b-[1.5px] border-solid border-border px-16 py-11 first-line:pt-0 first:pt-0 last:border-0 last:pb-0 only:py-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-12">
                  <span className="leading-none">SOL</span>
                  <span className=" text-medium text-[15px] leading-none text-muted-foreground ">
                    $19.00
                  </span>
                </div>
                <div>
                  <span className=" text-medium text-[15px] leading-none text-muted-foreground ">
                    310.422
                  </span>
                </div>
              </div>
            </div>
            <div className="border-b-[1.5px] border-solid border-border px-16 py-11 first-line:pt-0 first:pt-0 last:border-0 last:pb-0 only:py-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-12">
                  <span className="leading-none">wSOL</span>
                  <span className=" text-medium text-[15px] leading-none text-muted-foreground ">
                    $19.00
                  </span>
                </div>
                <div>
                  <span className=" text-medium text-[15px] leading-none text-muted-foreground ">
                    310.422
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-18 rounded-[16px] bg-secondary">
            <div className="border-b-[1.5px] border-solid border-border px-16 py-11 first-line:pt-0 first:pt-0 last:border-0 last:pb-0 only:py-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-12">
                  <span className="leading-none">CTUS</span>
                  <span className=" text-medium text-[15px] leading-none text-muted-foreground ">
                    $19.00
                  </span>
                </div>
                <div>
                  <span className=" text-medium text-[15px] leading-none text-muted-foreground ">
                    10 103
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
