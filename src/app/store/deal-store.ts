import { create } from 'zustand'

import { api } from '@/api/client'
import { Account, Deal, DealActions } from '@/api/generated-api'

import { useUserStore } from './user-store'

type DealStore = {
  deal: Deal | null
  loading: boolean
  dealActions: DealActions | null
  iOwner: boolean
  iContractor: boolean
  iChecker: boolean
  iClient: boolean
  iExecutor: boolean

  setDeal: (deal: Deal) => void
  setLoading: (loading: boolean) => void
  updateDeal: () => Promise<void>
}

const checkMyRoles = (deal: Deal, connectedUser: Account) => {
  const iOwner = deal.ownerPublicKey === connectedUser.publicKey
  const iContractor = deal.contractorPublicKey === connectedUser.publicKey

  return {
    iChecker: false,
    iClient:
      (iOwner && deal.ownerRole === 'CLIENT') ||
      (deal.ownerRole === 'EXECUTOR' && iContractor),
    iContractor,
    iExecutor:
      (iOwner && deal.ownerRole === 'EXECUTOR') ||
      (deal.ownerRole === 'CLIENT' && iContractor),
    iOwner
  }
}

export const useDealStore = create<DealStore>((set, get) => ({
  deal: null,
  loading: true,
  dealActions: null,
  iChecker: false,
  iClient: false,
  iContractor: false,
  iExecutor: false,
  iOwner: false,

  async setDeal(deal) {
    set({ deal })
    const dealActions = await api.deals.actionsDetail(deal.id)
    const user = useUserStore.getState().connectedUser

    if (user) {
      const roles = checkMyRoles(deal, user)
      set({ ...roles })
    }

    set({ dealActions })
  },
  async updateDeal() {
    const { deal: storedDeal, setDeal } = get()

    if (storedDeal?.id) {
      const deal = await api.deals.dealsDetail(storedDeal.id)
      setDeal(deal)
    }
  },
  setLoading(loading: boolean) {
    set({ loading })
  }
}))
