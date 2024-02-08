import { formatUnits } from 'viem'

import httpClient from '@/api/httpClient'
import { useDealStore } from '@/app/store/deal-store'
import { useUserStore } from '@/app/store/user-store'
import { Deal } from '@/app/types'
import Tag from '@/components/ui/tag'
import { transformString } from '@/lib/utils'

import { DealAmountChange } from './DealAmountChange'
import { PartnerEdit } from './PartnerEdit'

export const DealInfo = () => {
  const {
    deal,
    setDeal,
    iClient,
    iExecutor,
    executorPublicKey,
    clientAddress
  } = useDealStore()
  const { connectedUser } = useUserStore()

  if (!deal) {
    throw new Error('No deal')
  }

  const handleClientEdit = async (address: string) => {
    const { data } = await httpClient<Deal>({
      url: `deals/${deal.id}/participate`,
      method: 'POST',
      data: {
        type: 'CONTRACTOR',
        publicKey: address,
        blockchain: connectedUser?.blockchain
      }
    })

    setDeal(data)
  }

  return (
    <div className="relative flex w-full flex-col items-center gap-[13px]">
      <div className="lex h-full w-full flex-col items-center rounded-[19px] border-[1px] border-[#262930] bg-secondary ">
        <div className=" flex h-full w-full flex-col p-[20px] ">
          <div className="flex items-center gap-[8px] ">
            <span className="text-sm font-medium text-[#656975]">CLIENT</span>
            {iClient && <Tag>You</Tag>}
            {deal.ownerRole === 'CLIENT' && <Tag type="owner">Owner</Tag>}
          </div>

          <span className="mt-[9px] text-2xl font-[500]">
            {clientAddress ? transformString(clientAddress) : 'Empty'}
          </span>

          {!iClient && <PartnerEdit onSave={handleClientEdit} />}
        </div>

        <div className="relative flex h-full w-full justify-between  border-t-[1px] border-t-[#262930] p-[20px] ">
          <div className="flex flex-col ">
            <span className="text-sm font-medium text-[#656975]">
              AMOUNT OF DEAL
            </span>
            <div className="mt-[9px] flex items-end gap-[4px]">
              <span className="text-2xl font-[500]">
                {formatUnits(BigInt(deal.amount), deal.token?.decimals)}
              </span>
              <span className=" mb-[2px] text-base font-[600] text-[#656975]">
                {deal.token?.code}
              </span>
            </div>
          </div>

          <div className="absolute right-[20px] top-[20px] flex items-end">
            <DealAmountChange />
          </div>
        </div>
      </div>

      <div className="relative flex h-full w-full justify-between  rounded-[19px] border-[1px] border-[#262930] bg-secondary p-[20px]">
        <div className="flex flex-col">
          <div className="flex items-center gap-[8px]">
            <span className="text-sm font-medium text-[#656975]">EXECUTOR</span>

            {iExecutor && <Tag>You</Tag>}
            {deal.ownerRole === 'EXECUTOR' && <Tag type="owner">Owner</Tag>}
          </div>
          <span className="mt-[16px] text-2xl font-[500]">
            {executorPublicKey ? transformString(executorPublicKey) : 'Empty'}
          </span>
          <span className="mt-[16px] text-sm font-[400] text-[#656975]">
            Performs the work specified in the contract.
          </span>
        </div>

        {!iExecutor && <PartnerEdit onSave={handleClientEdit} />}
      </div>
    </div>
  )
}
