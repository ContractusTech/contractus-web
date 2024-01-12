import 'react-day-picker/dist/style.css'
import 'dayjs/locale/en'

import { Root } from '@radix-ui/react-form'
import dayjs from 'dayjs'

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
  return (
    <div className="m-[0_auto] flex max-w-[534px] flex-col gap-[30px]">
      <Root
        className="flex flex-col gap-[40px]"
        onSubmit={e => e.preventDefault()}
      >
        <div className="flex flex-col gap-[13px]">
          <DealInfo />
          <CheckerEdit />
          <DeadLineField />
        </div>

        <div className="flex flex-col gap-[13px]">
          <PerformanceBond />
        </div>

        <div className="flex flex-col gap-[13px]">
          <span className="text-[29px] text-[#D5D9E0]">Details</span>
          <CommentField />
          <FileList />
        </div>

        <RoleSignatureView />
        <StartDealBtn />
        <CancelDealButton />
      </Root>
    </div>
  )
}
