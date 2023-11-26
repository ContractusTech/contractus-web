import { create } from 'zustand'

import { Account } from '@/api/generated-api'

type UserStore = {
  connectedUser: null | Account
  setConnectedUser: (user: Account) => void
}

export const useUserStore = create<UserStore>(set => ({
  connectedUser: null,

  setConnectedUser(user: Account) {
    set({ connectedUser: user })
  }
}))
