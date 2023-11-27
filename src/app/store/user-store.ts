import Cookies from 'js-cookie'
import { create } from 'zustand'

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
    Cookies.remove(COOKIES.AUTH_TOKEN)
  }
}))
