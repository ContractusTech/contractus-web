import { api } from '@/api/client'

import { BaseService } from '../../shared/base.service'

class TokensServiceClass extends BaseService {
  async getTokens() {
    const response = await api.resources.tokensList()
    return response
  }
}

export const TokensService = new TokensServiceClass('api/v1/resources')
