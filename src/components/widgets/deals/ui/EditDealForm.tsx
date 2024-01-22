import 'react-day-picker/dist/style.css'
import 'dayjs/locale/en'

import { Root } from '@radix-ui/react-form'
import dayjs from 'dayjs'

import { useDealStore } from '@/app/store/deal-store'

import CancelDealButton from './CancelDealButton'
import { CheckerEdit } from './CheckerEdit'
import { CommentField } from './CommentField'
import { DeadLineField } from './DeadLineField'
import { DealInfo } from './DealInfo'
import { FileList } from './FileList'
import { PerformanceBond } from './performanceBond'
import { RoleSignatureView } from './RoleSignatureView'
import { StartDealBtn } from './StartDealBtn'

dayjs.locale('en')

export const EditDealForm = () => {
  const dealStore = useDealStore()

  return (
    <div className="m-[0_auto] flex max-w-[534px] flex-col gap-[30px]">
      <Root
        className="flex flex-col gap-[40px]"
        onSubmit={e => e.preventDefault()}
      >
        <div className="flex flex-col gap-[13px]">
          <DealInfo />
          {dealStore.deal?.completionCheckType === 'CHECKER' && <CheckerEdit />}
          <DeadLineField />
        </div>

        {dealStore.deal?.performanceBondType !== 'NONE' && (
          <div className="flex flex-col gap-[13px]">
            <PerformanceBond />
          </div>
        )}

        <div className="flex flex-col gap-[13px]">
          <span className="text-[29px] text-[#D5D9E0]">Details</span>
          <CommentField />
          <FileList />
        </div>

        <RoleSignatureView />

        {/* @ts-ignore */}
        {dealStore.dealActions?.actions.map(action => {
          switch (action) {
            case 'SIGN': {
              return <StartDealBtn />
            }

            case 'CANCEL': {
              return <CancelDealButton />
            }

            case 'FINISH': {
              return <span>Can finish</span>
            }

            case 'CANCEL_SIGN': {
              return <span>Can cancel sign</span>
            }

            case 'REVOKE': {
              return <span>Can revoke</span>
            }
          }
        })}
      </Root>
    </div>
  )
}
