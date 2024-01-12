import { create } from 'zustand'

import { Deal } from '@/api/generated-api'

type DealStore = {
  deal: Deal | null
  loading: boolean
  setDeal: (deal: Deal) => void
  setLoading: (loading: boolean) => void
}

export const useDealStore = create<DealStore>(set => ({
  deal: null,
  loading: true,

  setDeal(deal) {
    set({ deal })
  },
  setLoading(loading: boolean) {
    set({ loading })
  }
}))
