import { clsx } from 'clsx'
import { FC, ReactNode } from 'react'

import { ArrowLeftBottomCorner } from '@/assets/svg/ArrowLeftBottomCorner'

type Props = {
  children?: ReactNode | JSX.Element
  status?: string
  time?: string
  amount?: string
  currency?: string
  earningAmount?: string
  clientID: string
}

export const DealHistoryCard: FC<Props> = ({
  status,
  time,
  amount,
  currency,
  earningAmount,
  clientID
}) => {
  const isStatusNew = status?.toLowerCase() === 'new'
  return (
    <div className="flex min-h-[160px] flex-col rounded-[20px] bg-secondary p-12">
      <div>
        <div className="mb-12 flex items-center justify-between">
          <p
            className={clsx(
              'text-[12px] font-semibold uppercase leading-none',
              isStatusNew && 'text-blue'
            )}
          >
            {status ?? 'In work'}
          </p>
          <p className="flex-grow-0 text-[12px] leading-none">{time ?? '0h'}</p>
        </div>
        <div className="mb-10 flex items-end gap-x-5">
          <p className="text-[30px] leading-none">{amount ?? '0'}</p>
          <div className="flex flex-col justify-end gap-y-3">
            {isStatusNew && <ArrowLeftBottomCorner />}
            <p className="text-[13px] font-semibold uppercase leading-none text-secondary-text">
              {currency ?? 'SOL'}
            </p>
          </div>
        </div>
        <div>
          {earningAmount && (
            <p className="text-[12px] font-medium leading-none">
              <span className="text-secondary-text">Earning</span>{' '}
              <span className="uppercase text-dark-base-green">{`${earningAmount} ${currency}`}</span>
            </p>
          )}
        </div>
      </div>
      <div className="mt-auto">
        <p className="mb-2 text-[12px] font-medium leading-none text-secondary-text">
          Client
        </p>
        <p className="text-[15px] font-medium leading-none">{clientID}</p>
      </div>
    </div>
  )
}
