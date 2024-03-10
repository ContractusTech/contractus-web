import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'

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

api.instance.interceptors.response.use(
  res => res,
  err => {
    const message = err?.response?.data?.error

    if (message) {
      toast.error(message)
    }
  }
)
