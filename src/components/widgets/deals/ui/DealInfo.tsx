import { useMemo } from 'react'
import { formatUnits } from 'viem'

import { Deal } from '@/api/generated-api'
import httpClient from '@/api/httpClient'
import { useDealStore } from '@/app/store/deal-store'
import { useUserStore } from '@/app/store/user-store'
import Tag from '@/components/ui/tag'
import { transformString } from '@/lib/utils'

import { AmountChange } from './AmountChange'
import { EditAddressButton } from './EditAddressButton'

export const DealInfo = () => {
  const { deal, setDeal } = useDealStore()
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
        blockchain: 'bsc'
      }
    })

    setDeal(data)
  }

  const iClient = useMemo(
    () =>
      deal.ownerRole === 'CLIENT' &&
      deal.ownerPublicKey === connectedUser?.publicKey,
    [connectedUser?.publicKey, deal.ownerPublicKey, deal.ownerRole]
  )

  const iExecutor = useMemo(
    () =>
      deal.ownerRole === 'EXECUTOR' &&
      deal.ownerPublicKey === connectedUser?.publicKey,
    [connectedUser?.publicKey, deal.ownerPublicKey, deal.ownerRole]
  )

  return (
    <div className="relative flex w-full flex-col items-center gap-[13px]">
      <div className="lex h-full w-full flex-col items-center rounded-[13px] border-[1px] border-[#2A2E37] bg-[#15151A] ">
        <div className=" flex h-full w-full flex-col p-[20px] ">
          <div className="flex items-center gap-[8px] ">
            <span className="text-[15px] font-[600] text-[#656975]">
              CLIENT
            </span>
            {iClient && <Tag>You</Tag>}
            {deal.ownerRole === 'CLIENT' && <Tag>Owner</Tag>}
          </div>

          <span className="mt-[9px] text-[22px] font-[500]">
            {deal.ownerRole === 'CLIENT'
              ? transformString(deal.ownerPublicKey)
              : transformString(deal.contractorPublicKey ?? '')}

            {/* {iClient
              ? transformString(deal.ownerPublicKey)
              : deal.contractorPublicKey
              ? transformString(deal.contractorPublicKey)
              : 'Empty'} */}
          </span>

          {!iClient && (
            <EditAddressButton
              triggerClassName="absolute right-[20px] top-[20px]"
              title="Edit client"
              onSave={handleClientEdit}
            />
          )}
        </div>

        <div className="relative flex h-full w-full justify-between  border-t-[1px] border-t-[#2A2E37] p-[20px] ">
          <div className="flex flex-col ">
            <span className=" text-[15px] font-[600] text-[#656975]">
              AMOUNT OF DEAL
            </span>
            <div className="mt-[9px] flex items-end gap-[4px]">
              <span className=" text-[22px] font-[500]">
                {/* @ts-ignore */}
                {formatUnits(BigInt(deal.amount), deal.token?.decimals)}
              </span>
              <span className=" mb-[2px] text-[15px] font-[600] text-[#656975]">
                {deal.token?.code}
              </span>
            </div>
          </div>

          <div className="absolute right-[20px] top-[20px] flex items-end">
            <AmountChange />
          </div>
        </div>
      </div>

      <div className="relative flex h-full w-full justify-between  rounded-[13px] border-[1px] border-[#2A2E37] bg-[#15151A] p-[20px]">
        <div className="flex flex-col">
          <div className="flex items-center gap-[8px] text-[12px] text-[#8b8f97]">
            <span className="text-[15px] font-[600] text-[#656975]">
              EXECUTOR
            </span>

            {iExecutor && <Tag>You</Tag>}
            {deal.ownerRole === 'EXECUTOR' && <Tag>Owner</Tag>}
          </div>
          <span className="mt-[16px] text-[22px] font-[500]">
            {iExecutor
              ? transformString(deal.ownerPublicKey)
              : deal.contractorPublicKey
              ? transformString(deal.contractorPublicKey)
              : 'Empty'}
          </span>
          <span className="text-[13px] font-[500] text-[#656975]">
            Performs the work specified in the contract.
          </span>
        </div>

        {!iExecutor && (
          <EditAddressButton
            triggerClassName="absolute right-[20px] top-[20px]"
            title="Edit executor"
            onSave={handleClientEdit}
          />
        )}
      </div>
    </div>
  )
}
