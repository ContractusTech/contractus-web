import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect } from 'react'

import { useDeals } from '@/api/modules/deals/hooks/useDeals'
import { useUserStore } from '@/app/store/user-store'
import { NextPageWithLayout } from '@/app/types'
import { AddCircleIcon } from '@/assets/svg/AddCircleIcon'
import { ChevronDownIcon } from '@/assets/svg/ChevronDownIcon'
import { CrownIcon } from '@/assets/svg/CrownIcon'
import { StatisticsList } from '@/components/entities/statistics'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DealCard, EmptyPlaceholder } from '@/components/widgets/deals'
import { Balance } from '@/components/widgets/estimatedBalance'
import { CreateDealButton, TokenSwapper } from '@/components/widgets/tokens'
import LayoutDefault from '@/layouts/default'

const IndexPage: NextPageWithLayout = () => {
  const { connectedUser } = useUserStore()
  const { deals, refetch } = useDeals()
  const [parent] = useAutoAnimate()

  useEffect(() => {
    if (connectedUser?.publicKey) {
      refetch()
    }
  }, [connectedUser?.publicKey, refetch])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectedUser?.publicKey) {
        refetch()
      }
    }, 10_000)

    return () => {
      clearInterval(intervalId)
    }
  }, [connectedUser?.publicKey, refetch])

  useEffect(() => {
    // api.accounts.topupCreate()
    // api.accounts.balanceCreate({ currency: 'USD', tokens: [] })
    // api.accounts.statisticsList()
    // api.accounts.loanCreate()
  }, [])

  return (
    <>
      <>
        <Balance />
        <section className="mx-auto mb-30 flex gap-13 md:flex-wrap md:justify-center">
          <Button variant="secondary">
            <AddCircleIcon className="mr-4 h-16 w-16" />
            Buy
          </Button>
          <span className="flex h-38 items-center gap-x-8 rounded-[12px] border border-input bg-background px-20 py-10 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <CrownIcon className="mr-4 h-16 w-16" />
            Get CTUS Token
          </span>
        </section>

        <TokenSwapper />

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
          <div className="grid grid-cols-3 gap-8 md:grid-cols-2" ref={parent}>
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
