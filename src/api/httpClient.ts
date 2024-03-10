import axios, { AxiosRequestConfig } from 'axios'
import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'

import { COOKIES } from '@/app/constants/cookies'
import { ENV } from '@/app/constants/environment'

axios.defaults.baseURL = `${ENV.API_HOST}/api/v1/`

axios.interceptors.response.use(
  res => res,
  err => {
    const message = err?.response?.data?.error

    if (message) {
      toast.error(message)
    }
  }
)

const httpClient = <T>({
  method = 'GET',
  url,
  data,
  params,
  headers
}: AxiosRequestConfig) =>
  axios<T>({
    method,
    url,
    data,
    params,
    headers: {
      ...headers,
      Authorization: getCookie(COOKIES.AUTH_TOKEN)
    }
  })

export default httpClient
