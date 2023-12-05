import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { joinURL } from 'ufo'

import { ENV } from '../../app/constants/environment'

type MakeSafeRequestOptions = {
  okIfStatus?: number | number[]
}

export class BaseService {
  axios: AxiosInstance
  endpoint: string
  apiHost: string

  constructor(endpoint: string) {
    this.axios = axios
    this.endpoint = endpoint
    this.apiHost = ENV.API_HOST
  }

  /**
   * Always use this method to get endpoint path
   *
   * @example
   * process.env.API_HOST = 'https://api.com'
   *
   * class XService extends Service {}
   *
   * const service = new Service('api/v1/products')
   *
   * service.getPath() => 'https://api.com/api/v1/products'
   * service.getPath('all') => 'https://api.com/api/v1/products/all'
   * service.getPath(1, 'get') => 'https://api.com/api/v1/products/1/get'
   */
  protected getPath(...input: any[]) {
    return joinURL(this.apiHost, this.endpoint, ...input.map(x => x.toString()))
  }

  async makeSafeRequest<TResponse>(
    axiosConfig: AxiosRequestConfig,
    { okIfStatus = 200 }: MakeSafeRequestOptions = {}
  ) {
    let ok = false
    try {
      const { status, data } = await this.axios.request<TResponse>(axiosConfig)

      if (Number.isInteger(okIfStatus)) {
        ok = okIfStatus === status
      } else if (Array.isArray(okIfStatus)) {
        ok = okIfStatus.includes(status)
      }

      return { ok, data }
    } catch {
      //TODO correct validation-errors form
      return { ok, errors: null }
    }
  }
}
