import { AddCircleIcon } from '@/assets/svg/AddCircleIcon'
import { ArrowUpOutlineIcon } from '@/assets/svg/ArrowUpOutlineIcon'
import { CrownIcon } from '@/assets/svg/CrownIcon'
import { SwapArrowIcon } from '@/assets/svg/SwapArrowIcon'
import { AppLogo } from '@/components/entities/logo/AppLogo'
import { UserOptions } from '@/components/features/user-options'
import { Button } from '@/components/ui/button'
import { SelectTokens } from '@/components/widgets/tokens'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-24">
      <header className="h-54 flex flex-shrink-0 flex-grow-0 items-center justify-between">
        <div className="mt-auto basis-[170px]">
          <AppLogo />
        </div>
        <div className="py-6">
          <Button
            variant="default"
            className="bg-blue h-25 group flex items-center rounded-[7px] px-12 py-6 text-[12px] text-secondary-foreground shadow-[0px_1px_0px_0px_#2F4AAB] hover:bg-white/90 hover:text-secondary"
          >
            <CrownIcon className="mr-4 h-16 w-16 text-secondary-foreground transition duration-200 group-hover:text-secondary" />
            Holder mode
          </Button>
        </div>
        <div className="mt-auto basis-[170px]">
          <UserOptions />
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-[500px] flex-grow flex-col border-t-[1px] border-border pt-20">
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
          <SelectTokens>
            <span className="h-38 flex items-center gap-x-8 rounded-[12px] border border-input bg-background px-20 py-10 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <CrownIcon className="mr-4 h-16 w-16" />
              Get CTUS Token
            </span>
          </SelectTokens>
        </div>

        <section className="w-full border-t-[1px] border-border">
          <div className="py-13 px-15 mb-6 flex items-center justify-between">
            <h2 className="typo-label">TOKENS</h2>
          </div>

          <div className="py-18 relative mb-8 rounded-[16px] bg-secondary">
            <div>
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
            <div className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 translate-y-[calc(-50%_+_1.5px)]">
              <Button variant="outline" size="icon">
                <SwapArrowIcon />
              </Button>
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
