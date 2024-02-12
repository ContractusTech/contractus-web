import { ENV } from '@/app/constants/environment'

const MESSAGES = {
  SIGN_MESSAGE: 'web-client',
  WC_ID: ENV.WC_ID,
  WBNB_ADDRESS: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
  CONTRACTOR_ADDRESS: ENV.CONTRACTOR_ADDRESS
} as const

export default MESSAGES
