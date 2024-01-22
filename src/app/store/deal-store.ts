import { create } from 'zustand'

import { api } from '@/api/client'
import { Deal, DealActions } from '@/api/generated-api'

type DealStore = {
  deal: Deal | null
  loading: boolean
  dealActions: DealActions | null
  setDeal: (deal: Deal) => void
  setLoading: (loading: boolean) => void
}

export const useDealStore = create<DealStore>(set => ({
  deal: null,
  loading: true,
  dealActions: null,

  async setDeal(deal) {
    set({ deal })
    const dealActions = await api.deals.actionsDetail(deal.id)
    set({ dealActions })
  },
  setLoading(loading: boolean) {
    set({ loading })
  }
}))
