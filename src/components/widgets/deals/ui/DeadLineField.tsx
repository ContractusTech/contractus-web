import dayjs from 'dayjs'

import { Deal } from '@/api/generated-api'

import { EditDeadline } from './editDeadline'

export const DeadLineField = ({ deal }: { deal: Deal }) => {
  return (
    <div>
      <span className="ml-[8px] text-[24px]">Deadline</span>

      <div className="flex rounded-[13px] border-[1px] border-[#2A2E37] p-[12px]">
        <div className="flex flex-col">
          <span className="text-[28px]">
            {dayjs(deal.deadline).format('DD MMMM YYYY')}
          </span>

          <span className="max-w-[50%] text-[12px] text-[#8b8f97]">
            If the counter parties do not agree before the appointed date, the
            contract is terminated and the funds are returned to all parties.
          </span>
        </div>

        <div className="mt-[auto]">
          <EditDeadline deal={deal} />
        </div>
      </div>
    </div>
  )
}
