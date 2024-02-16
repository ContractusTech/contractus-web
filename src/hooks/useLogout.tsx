import { deleteCookie } from 'cookies-next'

import { COOKIES } from '@/app/constants/cookies'

export const useLogout = () => {
  const logout = () => {
    deleteCookie(COOKIES.AUTH_TOKEN)
    window.location.href = '/'
  }

  return { logout }
}
