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
  clientAddress?: string
  executorPublicKey?: string
  signedByClient: boolean
  signedByExecutor: boolean
  signedByChecker: boolean

  setDeal: (deal: Deal) => void
  setLoading: (loading: boolean) => void
  updateDeal: () => Promise<void>
}

const checkMyRoles = (
  deal: Deal,
  connectedUser: Account,
  actions: DealActions
) => {
  const iOwner = deal.ownerPublicKey === connectedUser.publicKey
  const iContractor = deal.contractorPublicKey === connectedUser.publicKey

  const iClient =
    (iOwner && deal.ownerRole === 'CLIENT') ||
    (iContractor && deal.ownerRole === 'EXECUTOR')

  const iExecutor =
    (iOwner && deal.ownerRole === 'EXECUTOR') ||
    (iContractor && deal.ownerRole === 'CLIENT')

  const clientAddress = iClient
    ? connectedUser.publicKey
    : deal.ownerPublicKey === connectedUser.publicKey
    ? deal.contractorPublicKey
    : deal.ownerPublicKey

  const executorPublicKey = iExecutor
    ? connectedUser.publicKey
    : connectedUser.publicKey === deal.ownerPublicKey
    ? deal.contractorPublicKey
    : deal.ownerPublicKey

  const signedByClient =
    deal?.ownerRole === 'CLIENT'
      ? actions.signedByOwner
      : actions.signedByContractor

  const signedByExecutor =
    deal?.ownerRole === 'EXECUTOR'
      ? actions.signedByOwner
      : actions.signedByContractor

  return {
    iChecker: false,
    iClient,
    iContractor,
    iExecutor,
    iOwner,
    clientAddress,
    executorPublicKey,
    signedByClient,
    signedByExecutor,
    signedByChecker: actions.signedByChecker
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
  signedByClient: false,
  signedByExecutor: false,
  signedByChecker: false,

  async setDeal(deal) {
    set({ deal })
    const dealActions = await api.deals.actionsDetail(deal.id)
    const user = useUserStore.getState().connectedUser

    if (user) {
      const roles = checkMyRoles(deal, user, dealActions)
      set({ ...roles })
      set({ dealActions })
    }
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
