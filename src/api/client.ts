import Cookies from 'js-cookie'

import { COOKIES } from '@/app/constants/cookies'

import { ContractusAPI } from './generated-api'

export const api = new ContractusAPI({
  baseURL: 'https://dev.contractus.tech/api/v1/',
  headers: {
    'X-Authorization': Cookies.get(COOKIES.AUTH_TOKEN)
  }
})

api.instance.interceptors.request.use(config => {
  const token = Cookies.get(COOKIES.AUTH_TOKEN)

  if (!config.headers.Authorization && token) {
    config.headers.Authorization = token
  }

  return config
})