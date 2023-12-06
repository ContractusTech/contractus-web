import axios from 'axios'
import { getCookie } from 'cookies-next'

import { COOKIES } from '../constants/cookies'

axios.interceptors.request.use(config => {
  const token = getCookie(COOKIES.AUTH_TOKEN)

  if (!config.headers['X-Authorization'] && token) {
    config.headers['X-Authorization'] = token
  }

  return config
})
