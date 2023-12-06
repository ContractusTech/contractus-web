import { BaseService } from '../../shared/base.service'
import { TokenListType } from './tokens.types'

class TokensServiceClass extends BaseService {
  async getTokens() {
    const response = await this.axios.get<TokenListType>(
      this.getPath('/tokens')
    )
    return response.data
  }
}

export const TokensService = new TokensServiceClass('api/v1/resources')
