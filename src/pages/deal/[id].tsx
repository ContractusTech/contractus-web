import { Loader } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

import { api } from '@/api/client'
import { useDealStore } from '@/app/store/deal-store'
import { NextPageWithLayout } from '@/app/types'
import { EditDealForm } from '@/components/widgets/deals'
import RootLayout from '@/layouts/default'

const DealPage: NextPageWithLayout = () => {
  const params = useParams<{ id: string }>()
  const dealId = params?.id

  const dealStore = useDealStore()

  useEffect(() => {
    if (!dealId) {
      return
    }

    dealStore.setLoading(true)

    api.deals.dealsDetail(dealId).then(deal => {
      console.log(deal)
      dealStore.setDeal(deal)
      dealStore.setLoading(false)
    })
  }, [dealId])

  if (dealStore.loading) {
    return null
  }

  return (
    <RootLayout>{dealStore.loading ? <Loader /> : <EditDealForm />}</RootLayout>
  )
}

export default DealPage
