import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { formatUnits } from 'viem'

import { useUser } from '@/api/hooks/useUser'
import { PAGES } from '@/app/constants/pages'
import { Deal } from '@/app/types'
import { ArrowLeftBottomCorner } from '@/assets/svg/ArrowLeftBottomCorner'
import { formatNumber, getTimeUnitFromNow, transformString } from '@/lib/utils'

type Props = {
  deal: Deal
}

const DealCard: FC<Props> = ({ deal }) => {
  const { user } = useUser()
  const router = useRouter()

  const handleDealClick = () => {
    router.push(PAGES.DEAL(deal.id))
  }

  const isStatusNew = deal.status === 'NEW'

  const clientAddress =
    deal.ownerRole === 'CLIENT' ? deal.ownerPublicKey : deal.contractorPublicKey

  return (
    <div
      className="flex min-h-[160px] cursor-pointer flex-col overflow-hidden rounded-[20px] border border-solid border-[#262930] bg-secondary p-12 hover:bg-accent"
      onClick={handleDealClick}
    >
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
          <p className="text-[30px] leading-none">
            {formatNumber(
              Number(
                formatUnits(BigInt(deal.amount), deal.token?.decimals ?? 0)
              )
            )}
          </p>
          <div className="flex flex-col justify-end gap-y-3">
            {isStatusNew && <ArrowLeftBottomCorner />}
            <p className="text-[13px] font-semibold uppercase leading-none text-secondary-text">
              {deal.token?.code}
            </p>
          </div>
        </div>
        {user?.publicKey === deal.checkerPublicKey && (
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
