import axios, { AxiosRequestConfig } from 'axios'
import { getCookie } from 'cookies-next'

import { COOKIES } from '@/app/constants/cookies'

axios.defaults.baseURL = 'https://dev.contractus.tech/api/v1/'

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
