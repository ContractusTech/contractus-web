import axios from 'axios'
import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'

import { COOKIES } from '../constants/cookies'

axios.interceptors.request.use(config => {
  const token = getCookie(COOKIES.AUTH_TOKEN)

  if (!config.headers['X-Authorization'] && token) {
    config.headers['X-Authorization'] = token
  }

  return config
})

axios.interceptors.response.use(res => {
  if (res.status === 500 || res.status === 400) {
    toast('Error')
  }

  return res
})
