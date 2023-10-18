import { AddCircleIcon } from '@/assets/svg/AddCircleIcon'
import { ArrowUpOutlineIcon } from '@/assets/svg/ArrowUpOutlineIcon'
import { ChevronDownIcon } from '@/assets/svg/ChevronDownIcon'
import { CrownIcon } from '@/assets/svg/CrownIcon'
import { SwapArrowIcon } from '@/assets/svg/SwapArrowIcon'
import { AppLogo } from '@/components/entities/logo/AppLogo'
import { UserOptions } from '@/components/features/user-options'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SelectTokens } from '@/components/widgets/tokens'
import { DealHistoryCard } from '@/components/widgets/tokens/ui/DealHistoryCard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-24 pb-35">
      <header className="flex h-54 flex-shrink-0 flex-grow-0 items-center justify-between">
        <div className="mt-auto basis-[170px]">
          <AppLogo />
        </div>
        <div className="py-6">
          <Button
            variant="default"
            className="group flex h-25 items-center rounded-[7px] bg-blue px-12 py-6 text-[12px] text-secondary-foreground shadow-[0px_1px_0px_0px_#2F4AAB] hover:bg-white/90 hover:text-secondary"
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

        <div className="mx-auto mb-30 flex gap-x-[13px]">
          <Button variant="secondary">
            <AddCircleIcon className="mr-4 h-16 w-16" />
            Buy
          </Button>
          <Button variant="secondary">
            <ArrowUpOutlineIcon className="mr-4 h-16 w-16" />
            Send
          </Button>
          <SelectTokens>
            <span className="flex h-38 items-center gap-x-8 rounded-[12px] border border-input bg-background px-20 py-10 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <CrownIcon className="mr-4 h-16 w-16" />
              Get CTUS Token
            </span>
          </SelectTokens>
        </div>

        <section className="mb-16 w-full border-t-[1px] border-border">
          <div className="mb-6 flex items-center justify-between px-15 py-13">
            <h2 className="typo-label">TOKENS</h2>
          </div>

          <div className="relative mb-8 rounded-[16px] bg-secondary py-18">
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

          <div className="rounded-[16px] bg-secondary py-18">
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

        <section className="mb-35">
          <div className="scroll-x-hidden flex items-center gap-x-8 overflow-x-scroll">
            <div className="flex min-w-[142px] flex-col gap-y-13 rounded-[15px] bg-secondary p-12">
              <p className="text-[12px] leading-none text-secondary-text">
                Revenue, 30d
              </p>
              <p className="text-[15px] leading-none text-dark-base-green">
                +$24.45
              </p>
            </div>

            <div className="flex min-w-[142px] flex-col gap-y-13 rounded-[15px] bg-secondary p-12">
              <p className="text-[12px] leading-none text-secondary-text">
                Locked
              </p>
              <p className="text-[15px] leading-none">$24.45</p>
            </div>

            <div className="flex min-w-[142px] flex-col gap-y-13 rounded-[15px] bg-secondary p-12">
              <p className="text-[12px] leading-none text-secondary-text">
                Paid
              </p>
              <p className="text-[15px] leading-none">$124.45</p>
            </div>

            <div className="flex min-w-[142px] flex-col gap-y-13 rounded-[15px] bg-secondary p-12">
              <p className="text-[12px] leading-none text-secondary-text">
                Paid, 30d
              </p>
              <p className="text-[15px] leading-none">$324.45</p>
            </div>

            <div className="flex min-w-[142px] flex-col gap-y-13 rounded-[15px] bg-secondary p-12">
              <p className="text-[12px] leading-none text-secondary-text">
                Paid
              </p>
              <p className="text-[15px] leading-none">$124.45</p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-20 flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger className="group">
                <h2 className="flex items-center gap-x-8 text-[32px] font-medium leading-[1.2]">
                  Latest
                  <ChevronDownIcon
                    className="relative top-[1px] h-16 w-16 transition duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </h2>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-secondary">
                <DropdownMenuItem>Not latest</DropdownMenuItem>
                <DropdownMenuItem>In proccess</DropdownMenuItem>
                <DropdownMenuItem>Others</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div>
              <Button>Create new</Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <DealHistoryCard
              status="In work"
              time="4h"
              amount="0.231"
              currency="SOL"
              earningAmount="0.3"
              clientID="ffr43***er41"
            />
            <DealHistoryCard
              status="New"
              time="4h"
              amount="0.231"
              currency="SOL"
              earningAmount="0.3"
              clientID="ffr43***er41"
            />
            <DealHistoryCard
              status="New"
              time="4h"
              amount="0.231"
              currency="SOL"
              earningAmount="0.3"
              clientID="ffr43***er41"
            />
            <DealHistoryCard
              status="In work"
              time="4h"
              amount="0.231"
              currency="SOL"
              earningAmount="0.3"
              clientID="ffr43***er41"
            />
            <DealHistoryCard
              status="New"
              time="4h"
              amount="0.231"
              currency="SOL"
              earningAmount="0.3"
              clientID="ffr43***er41"
            />
            <DealHistoryCard
              status="New"
              time="4h"
              amount="0.231"
              currency="SOL"
              earningAmount="0.3"
              clientID="ffr43***er41"
            />
          </div>
        </section>
      </div>
    </main>
  )
}
