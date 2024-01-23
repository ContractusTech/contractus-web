import { useAccount } from 'wagmi'
import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract
} from 'wagmi/actions'

import wbnbAbi from '@/app/constants/wbnbAbi'
import MESSAGES from '@/app/constants/web3'

const MAGIC_APPROVE_VALUE = 10_000_000_000_000_000_000n

export const useApprove = () => {
  const { address } = useAccount()

  const approve = async () => {
    const allowance = await checkAllowance()

    if (!allowance) {
      throw new Error('Error on getting allowance')
    }

    if (allowance < MAGIC_APPROVE_VALUE) {
      const { request } = await prepareWriteContract({
        abi: wbnbAbi,
        address: MESSAGES.WBNB_ADDRESS,
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
        address: MESSAGES.WBNB_ADDRESS,
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
