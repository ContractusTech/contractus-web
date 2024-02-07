import { deleteCookie } from 'cookies-next'
import { create } from 'zustand'

import { Account } from '@/api/generated-api'
import { BalanceType } from '@/api/modules/accounts/accounts.types'

import { COOKIES } from '../constants/cookies'
import { TokenWithChecked } from '../types'

type UserStore = {
  connectedUser: null | Account
  selectedTokens: TokenWithChecked[]
  balance: BalanceType | null
  setConnectedUser: (user: Account) => void
  setSelectedTokens: (tokens: TokenWithChecked[]) => void
  setBalance: (balance: BalanceType) => void
  logout: () => void
}

export const useUserStore = create<UserStore>(set => ({
  connectedUser: null,
  selectedTokens: [],
  balance: null,

  setConnectedUser(user: Account) {
    set({ connectedUser: user })
  },
  setBalance(balance) {
    set({ balance })
  },
  setSelectedTokens(tokens) {
    set({ selectedTokens: tokens })
    localStorage.setItem('selectedTokens', JSON.stringify(tokens))
  },
  logout() {
    set({ connectedUser: null })
    deleteCookie(COOKIES.AUTH_TOKEN)
  }
}))
