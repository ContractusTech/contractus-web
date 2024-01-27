import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect } from 'react'

import { useDeals } from '@/api/modules/deals/hooks/useDeals'
import { useUserStore } from '@/app/store/user-store'
import { NextPageWithLayout } from '@/app/types'
import { ChevronDownIcon } from '@/assets/svg/ChevronDownIcon'
import { StatisticsList } from '@/components/entities/statistics'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DealCard, EmptyPlaceholder } from '@/components/widgets/deals'
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

  return (
    <>
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
  )
}

IndexPage.getLayout = page => {
  return <LayoutDefault>{page}</LayoutDefault>
}

export default IndexPage
