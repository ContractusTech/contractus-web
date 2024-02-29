import { ENV } from '@/app/constants/environment'

export const MESSAGES = {
  SIGN_MESSAGE: 'web-client',
  WC_ID: ENV.WC_ID,
  CONTRACTOR_ADDRESS: ENV.CONTRACTOR_ADDRESS as `0x${string}`,
  COMMIT_HASH: ENV.COMMIT_HASH.slice(0, 7)
} as const

export const BNB_TOKENS = {
  WBNB: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
  CTUS: '0xFd9Cc714EBEFccE66f56e3DC276793d695dEFEf6'
} as const

export default MESSAGES
