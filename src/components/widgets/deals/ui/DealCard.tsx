import { clsx } from 'clsx'
import { FC } from 'react'

import { Deal } from '@/api/generated-api'
import { useUserStore } from '@/app/store/user-store'
import { ArrowLeftBottomCorner } from '@/assets/svg/ArrowLeftBottomCorner'
import { getTimeUnitFromNow, transformString } from '@/lib/utils'

type Props = {
  deal: Deal
}

const DealCard: FC<Props> = ({ deal }) => {
  const { connectedUser } = useUserStore()

  const isStatusNew = deal.status === 'NEW'

  const clientAddress =
    deal.ownerRole === 'CLIENT' ? deal.ownerPublicKey : deal.contractorPublicKey

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
            {deal.status}
          </p>
          <p className="flex-grow-0 text-[12px] leading-none">
            {getTimeUnitFromNow(deal.createdAt)}
          </p>
        </div>
        <div className="mb-10 flex items-end gap-x-5">
          <p className="text-[30px] leading-none">{deal.amount}</p>
          <div className="flex flex-col justify-end gap-y-3">
            {isStatusNew && <ArrowLeftBottomCorner />}
            <p className="text-[13px] font-semibold uppercase leading-none text-secondary-text">
              {deal.token?.code}
            </p>
          </div>
        </div>
        {connectedUser?.publicKey === deal.checkerPublicKey && (
          <div>
            <p className="text-[12px] font-medium leading-none">
              <span className="text-secondary-text">Earning</span>
              <span className="uppercase text-dark-base-green">{`${deal.checkerAmount} ${deal.checkerToken?.code}`}</span>
            </p>
          </div>
        )}
      </div>
      <div className="mt-auto">
        <p className="mb-2 text-[12px] font-medium leading-none text-secondary-text">
          Client
        </p>
        <p className="text-[15px] font-medium leading-none">
          {transformString(clientAddress ?? '')}
        </p>
      </div>
    </div>
  )
}

export default DealCard
