import 'react-day-picker/dist/style.css'
import 'dayjs/locale/en'

import { Root } from '@radix-ui/react-form'
import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useDealStore } from '@/app/store/deal-store'

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
  const dealStore = useDealStore()

  const withChecker = useMemo(
    () => dealStore.deal?.completionCheckType === 'CHECKER',
    [dealStore.deal]
  )

  return (
    <div className="m-[0_auto] flex max-w-[534px] flex-col gap-[30px]">
      <Root
        className="flex flex-col gap-[40px]"
        onSubmit={e => e.preventDefault()}
      >
        <div className="flex flex-col gap-[13px]">
          <DealInfo />

          {withChecker && <CheckerEdit />}

          <DeadLineField />
        </div>

        {dealStore.deal?.performanceBondType !== 'NONE' && (
          <div className="flex flex-col gap-[13px]">
            <PerformanceBond />
          </div>
        )}

        {dealStore.deal?.status === 'STARTED' ? (
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

        <DealStatusBadge />

        {dealStore.dealActions?.actions.map(action => {
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
