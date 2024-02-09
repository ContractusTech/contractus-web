import { deleteCookie } from 'cookies-next'
import { create } from 'zustand'

import { COOKIES } from '../constants/cookies'
import { TokenWithChecked } from '../types'

type UserStore = {
  selectedTokens: TokenWithChecked[]
  setSelectedTokens: (tokens: TokenWithChecked[]) => void
  logout: () => void
}

export const useUserStore = create<UserStore>(set => ({
  selectedTokens: [],

  setSelectedTokens(tokens) {
    set({ selectedTokens: tokens })
    localStorage.setItem('selectedTokens', JSON.stringify(tokens))
  },
  logout() {
    // set({ connectedUser: null })
    deleteCookie(COOKIES.AUTH_TOKEN)
  }
}))
