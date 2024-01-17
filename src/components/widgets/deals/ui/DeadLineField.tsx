import dayjs from 'dayjs'

import { useDealStore } from '@/app/store/deal-store'

import { EditDeadline } from './editDeadline'

export const DeadLineField = () => {
  const { deal } = useDealStore()

  if (!deal) {
    throw new Error('No deal')
  }

  return (
    <div className="relative flex h-full w-full justify-between  rounded-[13px] border-[1px] border-[#2A2E37] bg-[#15151A] p-[20px]">
      <div className="flex flex-col">
        <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
          <span className="text-[15px] font-[600] text-[#656975]">
            DEADLINE
          </span>
        </div>

        <div className="flex items-end gap-[8px]">
          <span className="text-[29px] font-[500]">
            {dayjs(deal.deadline).format('DD MMMM YYYY')}
          </span>
        </div>

        <span className="text-[13px] font-[500] text-[#656975]">
          If the counter parties do not agree before the appointed date, the
          contract is terminated and the funds are returned to all parties.
        </span>
      </div>

      <EditDeadline />
    </div>
  )
}
