import { useAccount } from 'wagmi'
import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract
} from 'wagmi/actions'

import wbnbAbi from '@/app/constants/wbnbAbi'
import MESSAGES, { BNB_TOKENS } from '@/app/constants/web3'

const MAGIC_APPROVE_VALUE = 10_000_000_000_000_000_000n

export type TokenKey = 'WBNB' | 'CTUS'

export const useApprove = (token: TokenKey) => {
  const { address } = useAccount()

  const approve = async () => {
    const allowance = await checkAllowance()

    if (allowance === undefined) {
      throw new Error('Error on getting allowance')
    }

    if (allowance < MAGIC_APPROVE_VALUE) {
      const { request } = await prepareWriteContract({
        abi: wbnbAbi,
        address: BNB_TOKENS[token],
        functionName: 'approve',
        args: [MESSAGES.CONTRACTOR_ADDRESS, MAGIC_APPROVE_VALUE]
      })
      const { hash } = await writeContract(request)

      await waitForTransaction({ hash })
    }
  }

  const checkAllowance = async () => {
    try {
      if (!address) {
        throw new Error("Wallet isn't connected")
      }

      const allowance = await readContract({
        address: BNB_TOKENS[token],
        abi: wbnbAbi,
        functionName: 'allowance',
        args: [address, MESSAGES.CONTRACTOR_ADDRESS]
      })

      return allowance
    } catch (error) {
      console.log(error)
    }
  }

  return { approve, checkAllowance }
}
