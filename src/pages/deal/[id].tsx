import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { api } from '@/api/client'
import { Deal } from '@/api/generated-api'
import { EditDealForm } from '@/components/widgets/deals'

const DealPage = () => {
  const [deal, setDeal] = useState<Deal | null>(null)
  const params = useParams<{ id: string }>()
  const dealId = params?.id

  useEffect(() => {
    if (!dealId) {
      return
    }

    api.deals.dealsDetail(dealId).then(deal => {
      setDeal(deal)
    })
  }, [dealId])

  return deal && <EditDealForm {...deal} />
}

export default DealPage
