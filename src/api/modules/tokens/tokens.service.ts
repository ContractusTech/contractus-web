import { api } from '@/api/client'
import { Token } from '@/app/types'

import { BaseService } from '../../shared/base.service'

class TokensServiceClass extends BaseService {
  async getTokens() {
    const response = (await api.resources.tokensList()) as unknown as Token[]
    return response
  }
}

export const TokensService = new TokensServiceClass('api/v1/resources')
