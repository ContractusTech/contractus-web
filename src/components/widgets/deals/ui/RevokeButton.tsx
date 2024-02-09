import { useDeal } from '@/api/hooks/useDeal'
import httpClient from '@/api/httpClient'
import { ERRORS } from '@/app/constants/errors'
import { Button } from '@/components/ui/button'

export const RevokeButton = () => {
  const { deal, refetchDeal } = useDeal()

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

    await refetchDeal()
  }

  return <Button onClick={handleRevoke}>Revoke</Button>
}
