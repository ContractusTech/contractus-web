import { create } from 'zustand'

import { TokenWithChecked } from '../types'

type SelectedTokensStore = {
  selectedTokens: TokenWithChecked[]
  setSelectedTokens: (tokens: TokenWithChecked[]) => void
}

export const useSelectedTokensStore = create<SelectedTokensStore>(set => ({
  selectedTokens: [],

  setSelectedTokens(tokens) {
    set({ selectedTokens: tokens })
    localStorage.setItem('selectedTokens', JSON.stringify(tokens))
  }
}))
