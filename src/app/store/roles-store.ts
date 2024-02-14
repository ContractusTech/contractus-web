import { create } from 'zustand'

import { Account, DealActions } from '@/api/generated-api'

import { Deal } from '../types'

type RoleStore = {
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
  withChecker: boolean
  dealCanceled: boolean

  setRoles: (deal: Deal, user: Account, actions: DealActions) => void
}

export const useRolesStore = create<RoleStore>(set => ({
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
  withChecker: false,
  dealCanceled: false,

  setRoles(deal, user, actions) {
    const iOwner = deal.ownerPublicKey === user.publicKey
    const iContractor = deal.contractorPublicKey === user.publicKey

    const iClient =
      (iOwner && deal.ownerRole === 'CLIENT') ||
      (iContractor && deal.ownerRole === 'EXECUTOR')

    const iExecutor =
      (iOwner && deal.ownerRole === 'EXECUTOR') ||
      (iContractor && deal.ownerRole === 'CLIENT')

    const clientAddress = iClient
      ? user.publicKey
      : deal.ownerPublicKey === user.publicKey
      ? deal.contractorPublicKey
      : deal.ownerPublicKey

    const executorPublicKey = iExecutor
      ? user.publicKey
      : user.publicKey === deal.ownerPublicKey
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

    const FINISH_STATUSES: Deal['status'][] = ['CANCELED', 'REVOKED']
    const dealCanceled = FINISH_STATUSES.includes(deal.status)

    set({
      clientAddress,
      executorPublicKey,
      iClient,
      iContractor,
      iExecutor,
      iOwner,
      signedByExecutor,
      signedByClient,
      iChecker: deal.checkerPublicKey === user.publicKey,
      signedByChecker: actions.signedByChecker,
      withChecker: deal.completionCheckType === 'CHECKER',
      dealCanceled
    })
  }
}))
