import dayjs from 'dayjs'

import { useDealStore } from '@/app/store/deal-store'

import { EditDeadline } from './editDeadline'

export const DeadLineField = () => {
  const { deal } = useDealStore()

  if (!deal) {
    throw new Error('No deal')
  }

  return (
    <div className="relative flex h-full w-full justify-between  rounded-[19px] border-[1px] border-[#262930] bg-secondary p-[20px]">
      <div className="flex flex-col">
        <div className="flex items-center gap-[8px]">
          <span className="text-sm font-medium text-[#656975]">DEADLINE</span>
        </div>

        <div className="mt-[16px] flex items-end gap-[8px] ">
          <span className="text-2xl font-[500]">
            {dayjs(deal.deadline).format('DD MMMM YYYY')}
          </span>
        </div>

        <span className="mt-[16px] text-sm font-[400] text-[#656975]">
          If the counter parties do not agree before the appointed date, the
          contract is terminated and the funds are returned to all parties.
        </span>
      </div>

      <EditDeadline />
    </div>
  )
}
