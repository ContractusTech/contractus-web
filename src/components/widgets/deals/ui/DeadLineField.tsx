import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useDeal } from '@/api/hooks/useDeal'
import { useRolesStore } from '@/app/store/roles-store'

import { EditDeadline } from './EditDeadline'

export const DeadLineField = () => {
  const { deal } = useDeal()

  const { dealCanceled } = useRolesStore()

  if (!deal) {
    throw new Error('No deal')
  }

  const invalidDedline = useMemo(() => {
    const diff = dayjs(deal.deadline).diff(dayjs())
    return diff < 0
  }, [deal.deadline])

  return (
    <div className="relative flex h-full w-full justify-between  rounded-[19px] border-[1px] border-[#262930] bg-secondary p-[20px]">
      <div className="flex flex-col">
        <div className="flex items-center gap-[8px]">
          <span className="text-sm font-medium text-[#656975]">DEADLINE</span>
        </div>

        <div className="mt-[16px] flex items-end gap-[8px] ">
          <span
            className={`text-2xl font-[500] ${
              invalidDedline ? 'text-[#ad4c4c]' : 'text-[#d5d9e0]'
            }`}
          >
            {dayjs(deal.deadline).format('DD MMMM YYYY')}
          </span>
        </div>

        <span className="mt-[16px] text-sm font-[400] text-[#656975]">
          If the counter parties do not agree before the appointed date, the
          contract is terminated and the funds are returned to all parties.
        </span>
      </div>

      {!dealCanceled && <EditDeadline />}
    </div>
  )
}
