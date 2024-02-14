import { useAutoAnimate } from '@formkit/auto-animate/react'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

import { useDeals } from '@/api/hooks/useDeals'
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

const RootLayout = dynamic(() => import('../layouts/default'), {
  ssr: false
})

const IndexPage: NextPageWithLayout = () => {
  const [current, setCurrent] = useState('Latest')
  const { deals, refetchDeals } = useDeals({
    // @ts-ignore
    statuses: current !== 'Latest' ? [current] : []
  })
  const [parent] = useAutoAnimate()

  const list = useMemo(() => {
    return [
      'Latest',
      'NEW',
      'STARTED',
      'FINISHED',
      'CANCELED',
      'REVOKED'
    ].filter(listItem => listItem !== current)
  }, [current])

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
                {current}
                <ChevronDownIcon
                  className="relative top-[1px] h-16 w-16 transition duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-secondary">
              {list.map((item, i) => (
                <DropdownMenuItem
                  className="capitalize"
                  onClick={() => setCurrent(item)}
                  key={i}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <CreateDealButton onSuccess={refetchDeals} />
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
  return <RootLayout>{page}</RootLayout>
}

export default IndexPage
