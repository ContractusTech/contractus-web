import { getCookie } from 'cookies-next'

// import Cookies from 'js-cookie'
import { COOKIES } from '@/app/constants/cookies'
import { ENV } from '@/app/constants/environment'

import { ContractusAPI } from './generated-api'

export const api = new ContractusAPI({
  baseURL: `${ENV.API_HOST}/api/v1/`
})

api.instance.interceptors.request.use(config => {
  const token = getCookie(COOKIES.AUTH_TOKEN)

  if (!config.headers.Authorization && token) {
    config.headers['X-Authorization'] = token
  }

  return config
})
