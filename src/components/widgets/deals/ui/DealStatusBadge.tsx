import dayjs from 'dayjs'
import Image from 'next/image'
import { useMemo } from 'react'
import { formatUnits } from 'viem'

import { Deal } from '@/api/generated-api'
import { useDeal } from '@/api/hooks/useDeal'
import { ERRORS } from '@/app/constants/errors'
import { transformString } from '@/lib/utils'

import { RoleSignatureView } from './RoleSignatureView'

type FinishedData = {
  pKey: string
  amount: string
}
type BadgeData = {
  icon: 'canceled' | 'done' | 'expired' | 'hourglass' | 'in_work'
  title: string
  desc: string
}

const BADGES_MAP: {
  [key in Deal['status'] | 'EXPIRED']:
    | BadgeData
    | ((data: FinishedData) => BadgeData)
} = {
  CANCELED: {
    icon: 'canceled',
    desc: 'The funds were returned to the client',
    title: 'Canceled'
  },
  CANCELING: {
    icon: 'hourglass',
    desc: 'Transaction in process, please wait',
    title: 'Canceling...'
  },
  FINISHED: (data: FinishedData) => ({
    icon: 'done',
    desc: `${
      data.amount
    } WBNB was transferred to the account of the executor ${transformString(
      data.pKey
    )}`,
    title: 'Done'
  }),
  FINISHING: {
    icon: 'hourglass',
    desc: 'Transaction in process, please wait',
    title: 'Finishing...'
  },
  REVOKED: {
    icon: 'canceled',
    desc: 'The funds were returned to the client',
    title: 'Canceled'
  },
  STARTED: {
    icon: 'in_work',
    desc: 'The contractor has begun to fulfill the deal. If the conditions are not met, you can cancel the deal after 2 days',
    title: 'In work'
  },
  STARTING: {
    icon: 'hourglass',
    desc: 'Transaction in process, please wait',
    title: 'Starting...'
  },
  EXPIRED: {
    title: 'Expired',
    icon: 'expired',
    desc: 'The contractor has begun to fulfill the deal. If the conditions are not met, you can cancel the deal after 2 days'
  },
  NEW: {
    icon: 'in_work',
    desc: 'The contractor has begun to fulfill the deal. If the conditions are not met, you can cancel the deal after 2 days',
    title: 'In work'
  }
}

export const DealStatusBadge = () => {
  const { deal } = useDeal()

  if (!deal) {
    throw new Error(ERRORS.DEAL_EXISTS)
  }

  const badgeData = useMemo(() => {
    const prepatedData = BADGES_MAP[deal.status]

    if (typeof prepatedData === 'function') {
      return prepatedData({
        amount: formatUnits(
          BigInt(deal.amount),
          deal.token?.decimals
        ).toString(),
        pKey: transformString(
          (deal.ownerRole === 'EXECUTOR'
            ? deal.ownerPublicKey
            : deal.contractorPublicKey) ?? ''
        )
      })
    } else if (deal.status === 'STARTED' && dayjs() > dayjs(deal.deadline)) {
      return BADGES_MAP['EXPIRED'] as BadgeData
    }

    return prepatedData
  }, [
    deal.amount,
    deal.contractorPublicKey,
    deal.deadline,
    deal.ownerPublicKey,
    deal.ownerRole,
    deal.status,
    deal.token.decimals
  ])

  if (deal.status === 'NEW') {
    return <RoleSignatureView />
  }

  return (
    <div className="flex flex-col items-center rounded-[16px] bg-[#15151A] p-[24px]">
      <Image
        alt={deal.status}
        width={32}
        height={32}
        src={`/deal_badges/${badgeData.icon}.svg`}
      />
      <p className="mb-[12px] mt-[8px] text-[22px]">{badgeData.title}</p>
      <p className="text-center text-[13px] text-[#656975]">{badgeData.desc}</p>
    </div>
  )
}
