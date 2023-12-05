import { BaseService } from '../../shared/base.service'
import {
  BalanceRequestType,
  BalanceType,
  StatisticsType
} from './accounts.types'

class AccountsServiceClass extends BaseService {
  async getStatistics() {
    const response = await this.axios.get<StatisticsType>(
      this.getPath('/statistics')
    )
    return response.data
  }

  async getBalance(balanceDto: BalanceRequestType) {
    const response = await this.axios.post<BalanceType>(
      this.getPath('/statistics'),
      balanceDto
    )
    return response.data
  }
}

export const AccountsService = new AccountsServiceClass('api/v1/accounts')
