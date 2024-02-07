import { FC } from 'react'

import { cn, formatNumber } from '@/lib/utils'

type Props = {
  amount: number
  type: keyof typeof TITLES
}

const TITLES = {
  LOCKED: 'Locked',
  REVENUE_ALL: 'Revenue',
  REVENUE_30: 'Revenue',
  PAID_30: 'Paid, 30d',
  PAID_ALL: 'Paid, 30d'
}

const StatisticsListItem: FC<Props> = ({ amount, type }) => {
  const itemTitle = TITLES[type]

  return (
    <div className="flex min-w-[142px] select-none flex-col gap-y-13 rounded-[19px] border border-solid border-[#262930] p-12">
      <p className="cursor-default text-sm leading-none text-secondary-text">
        {itemTitle}
      </p>
      <p
        className={cn(
          'cursor-default text-2xl leading-none',
          amount > 0 && 'text-dark-base-green'
        )}
      >
        ${amount > 0 ? `+${formatNumber(amount)}` : formatNumber(amount)}
      </p>
    </div>
  )
}

export default StatisticsListItem
