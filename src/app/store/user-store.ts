import { deleteCookie } from 'cookies-next'
import { create } from 'zustand'

// import Cookies from 'js-cookie'
import { Account } from '@/api/generated-api'

import { COOKIES } from '../constants/cookies'

type UserStore = {
  connectedUser: null | Account
  setConnectedUser: (user: Account) => void
  logout: () => void
}

export const useUserStore = create<UserStore>(set => ({
  connectedUser: null,

  setConnectedUser(user: Account) {
    set({ connectedUser: user })
  },

  logout() {
    set({ connectedUser: null })
    deleteCookie(COOKIES.AUTH_TOKEN)
  }
}))
