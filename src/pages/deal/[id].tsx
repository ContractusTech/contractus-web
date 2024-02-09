import { useEffect } from 'react'

import { useDeal } from '@/api/hooks/useDeal'
import { useDealActions } from '@/api/hooks/useDealActions'
import { useUser } from '@/api/hooks/useUser'
import { useRolesStore } from '@/app/store/roles-store'
import { NextPageWithLayout } from '@/app/types'
import { EditDealForm } from '@/components/widgets/deals'
import RootLayout from '@/layouts/default'

const DealPage: NextPageWithLayout = () => {
  const { setRoles } = useRolesStore()

  const { deal } = useDeal()
  const { actions } = useDealActions()
  const { user } = useUser()

  useEffect(() => {
    if (deal && user && actions) {
      setRoles(deal, user, actions)
    }
  }, [deal, user, actions])

  return <EditDealForm />
}

DealPage.getLayout = page => {
  return <RootLayout>{page}</RootLayout>
}

export default DealPage
