export type DealType = {
  id: string
  blockchain: string
  performanceBondType: string
  completionCheckType: string
  createdAt: string
  updatedAt: string
  endedAt: string
  deadline: string
  token: {
    code: string
    address: string
  }
  amount: string
  amountFee: string
  ownerPublicKey: string
  contractorPublicKey: string
  checkerPublicKey: string
  status: string
  ownerRole: string
  encryptedSecretKey: string
  secretKeyHash: string
  sharedKey: string
  ownerBondAmount: string
  ownerBondToken: {
    code: string
    address: string
  }
  contractorBondAmount: string
  contractorBondToken: {
    code: string
    address: string
  }
  checkerAmount: string
  checkerToken: {
    code: string
    address: string
  }
  metaUpdatedAt: string
  meta: {
    content: object
    files: []
  }
  resultUpdatedAt: string
  result: {
    content: object
    files: []
  }
}

export type DealsListType = DealType[]
