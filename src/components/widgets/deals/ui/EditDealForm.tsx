import 'react-day-picker/dist/style.css'
import 'dayjs/locale/en'

import { Root } from '@radix-ui/react-form'
import dayjs from 'dayjs'

import { Deal } from '@/api/generated-api'

import { CommentField } from './CommentField'
import { DeadLineField } from './DeadLineField'
import { DealInfo } from './DealInfo'
import { EditDealHeader } from './EditDealHeader'
import { FileList } from './FileList'
import { PerformanceBond } from './performanceBond'
import { RoleSignatureView } from './RoleSignatureView'
import { StartDealBtn } from './StartDealBtn'

type EditDealFormProps = Deal

dayjs.locale('en')

export const EditDealForm = (props: EditDealFormProps) => {
  return (
    <div className="m-[0_auto] flex max-w-[600px] flex-col gap-[30px]">
      <EditDealHeader />

      <Root
        className="flex flex-col gap-[13px]"
        onSubmit={e => e.preventDefault()}
      >
        <DealInfo deal={props} />
        <PerformanceBond />
        <CommentField deal={props} />
        <FileList deal={props} />
        <DeadLineField deal={props} />
        <RoleSignatureView />
        <StartDealBtn />
      </Root>
    </div>
  )
}
