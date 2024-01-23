import httpClient from '@/api/httpClient'
import { ERRORS } from '@/app/constants/errors'
import { useDealStore } from '@/app/store/deal-store'
import { Button } from '@/components/ui/button'

export const RevokeButton = () => {
  const { deal } = useDealStore()

  const handleRevoke = async () => {
    if (!deal) {
      throw new Error(ERRORS.DEAL_EXISTS)
    }

    await httpClient({
      url: `deals/${deal.id}/cancel`,
      method: 'POST',
      data: {
        force: false
      }
    })
  }

  return <Button onClick={handleRevoke}>Revoke</Button>
}
