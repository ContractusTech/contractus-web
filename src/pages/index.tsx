import { useDeals } from '@/api/modules/deals/hooks/useDeals'
import { NextPageWithLayout } from '@/app/types'
import { AddCircleIcon } from '@/assets/svg/AddCircleIcon'
import { ArrowUpOutlineIcon } from '@/assets/svg/ArrowUpOutlineIcon'
import { ChevronDownIcon } from '@/assets/svg/ChevronDownIcon'
import { CrownIcon } from '@/assets/svg/CrownIcon'
import { SwapArrowIcon } from '@/assets/svg/SwapArrowIcon'
import { StatisticsList } from '@/components/entities/statistics'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DealCard, EmptyPlaceholder } from '@/components/widgets/deals'
import { CreateDealButton, SelectTokens } from '@/components/widgets/tokens'
import LayoutDefault from '@/layouts/default'

const IndexPage: NextPageWithLayout = () => {
  const { deals, refetch } = useDeals()

  return (
    <>
      <>
        <section className="mb-30">
          <div className="mb-13">
            <h1 className="typo-label text-center">Estimate balance</h1>
          </div>
          <h2 className="text-center text-6xl font-light leading-none">
            $54.00
          </h2>
        </section>

        <section className="mx-auto mb-30 flex gap-13 md:flex-wrap md:justify-center">
          <Button variant="secondary">
            <AddCircleIcon className="mr-4 h-16 w-16" />
            Buy
          </Button>
          <Button variant="secondary">
            <ArrowUpOutlineIcon className="mr-4 h-16 w-16" />
            Send
          </Button>
          <span className="flex h-38 items-center gap-x-8 rounded-[12px] border border-input bg-background px-20 py-10 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <CrownIcon className="mr-4 h-16 w-16" />
            Get CTUS Token
          </span>
        </section>

        <section className="mb-16 w-full border-t-[1px] border-[#262930] border-border">
          <div className="mb-6 flex items-center justify-between px-15 py-13">
            <h2 className="typo-label">TOKENS</h2>
            <SelectTokens />
          </div>

          <div className="relative mb-8 rounded-[16px] border border-solid border-[#262930] py-18">
            <div>
              <div className="border-b-[1px] border-solid border-[#262930] border-border px-16 py-11 first-line:pt-0 first:pt-0 last:border-0 last:pb-0 only:py-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-12">
                    <span className="text-medium text-base leading-none">
                      SOL
                    </span>
                    <span className="text-normal text-base leading-none text-muted-foreground ">
                      $19.00
                    </span>
                  </div>
                  <div>
                    <span className="text-medium text-base leading-none text-muted-foreground ">
                      310.422
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-b-[1.5px] border-solid border-border px-16 py-11 first-line:pt-0 first:pt-0 last:border-0 last:pb-0 only:py-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-12">
                    <span className="leading-none">wSOL</span>
                    <span className=" text-medium text-base leading-none text-muted-foreground ">
                      $19.00
                    </span>
                  </div>
                  <div>
                    <span className=" text-medium text-base leading-none text-muted-foreground ">
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

          <div className="rounded-[16px] border border-[#262930] py-18 ">
            <div className="border-b-[1.5px] border-solid border-border px-16 py-11 first-line:pt-0 first:pt-0 last:border-0 last:pb-0 only:py-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-12">
                  <span className="text-base leading-none">CTUS</span>
                  <span className=" text-medium text-base leading-none text-muted-foreground ">
                    $19.00
                  </span>
                </div>
                <div>
                  <span className=" text-medium text-base leading-none text-muted-foreground ">
                    10 103
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-35">
          <StatisticsList />
        </section>

        <section>
          <div className="mb-20 flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger className="group">
                <h2 className="flex items-center gap-x-8 text-2xl font-medium leading-[1.2]">
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
              <CreateDealButton onSuccess={refetch} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 md:grid-cols-2">
            {deals && deals.map(deal => <DealCard deal={deal} key={deal.id} />)}

            {deals && deals.length === 0 && <EmptyPlaceholder />}
          </div>
        </section>
      </>
    </>
  )
}

IndexPage.getLayout = page => {
  return <LayoutDefault>{page}</LayoutDefault>
}

export default IndexPage
