import { BaseService } from '../../shared/base.service'
import { DealsListType } from './deals.types'

class DealsServiceClass extends BaseService {
  async getDeals() {
    const response = await this.axios.get<DealsListType>(this.getPath())

    return response.data
  }
}

export const DealsService = new DealsServiceClass('api/v1/deals')
