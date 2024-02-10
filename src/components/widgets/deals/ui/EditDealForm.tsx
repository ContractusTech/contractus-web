import 'react-day-picker/dist/style.css'
import 'dayjs/locale/en'

import { Root } from '@radix-ui/react-form'
import dayjs from 'dayjs'

import { useDeal } from '@/api/hooks/useDeal'
import { useDealActions } from '@/api/hooks/useDealActions'
import { useRolesStore } from '@/app/store/roles-store'

import { CancelButton } from './CancelButton'
import { CancelSignButton } from './CancelSignButton'
import { CheckerEdit } from './CheckerEdit'
import { CommentField } from './CommentField'
import { DeadLineField } from './DeadLineField'
import { DealInfo } from './DealInfo'
import { DealStatusBadge } from './DealStatusBadge'
import { FileList } from './FileList'
import { FinishDealButton } from './FinishDealButton'
import { PerformanceBond } from './performanceBond'
import { RevokeButton } from './RevokeButton'
import { StartDealBtn } from './StartDealBtn'

dayjs.locale('en')

export const EditDealForm = () => {
  const { withChecker } = useRolesStore()
  const { deal } = useDeal()
  const { actions } = useDealActions()

  if (!deal || !actions) {
    return null
  }

  return (
    <div className="m-[0_auto] flex max-w-[534px] flex-col gap-[30px]">
      <Root
        className="flex flex-col gap-[40px]"
        onSubmit={e => e.preventDefault()}
      >
        <div className="flex flex-col gap-[13px]">
          {(deal.status === 'STARTED' || deal.status === 'EXPIRED') && (
            <DealStatusBadge />
          )}

          <DealInfo />

          {withChecker && <CheckerEdit />}

          <DeadLineField />
        </div>

        {deal.performanceBondType !== 'NONE' && (
          <div className="flex flex-col gap-[13px]">
            <PerformanceBond />
          </div>
        )}

        {deal.status === 'STARTED' ? (
          <div className="flex flex-col gap-[13px]">
            <span className="text-[29px] text-[#D5D9E0]">Result</span>
            <CommentField type="result" />
            <FileList type="result" />
          </div>
        ) : (
          <div className="flex flex-col gap-[13px]">
            <span className="text-[29px] text-[#D5D9E0]">Details</span>
            <CommentField type="meta" />
            <FileList type="meta" />
          </div>
        )}
        {deal.status !== 'STARTED' && deal.status !== 'EXPIRED' && (
          <DealStatusBadge />
        )}

        {deal.status === 'NEW' &&
          !actions.actions.includes('CANCEL_SIGN') &&
          !actions.actions.includes('SIGN') && <StartDealBtn disabled />}

        {actions.actions.map(action => {
          switch (action) {
            case 'SIGN': {
              return <StartDealBtn key={action} />
            }

            case 'CANCEL': {
              return <CancelButton key={action} />
            }

            case 'FINISH': {
              return <FinishDealButton key={action} />
            }

            case 'CANCEL_SIGN': {
              return <CancelSignButton key={action} />
            }

            case 'REVOKE': {
              return <RevokeButton key={action} />
            }
          }
        })}
      </Root>
    </div>
  )
}
