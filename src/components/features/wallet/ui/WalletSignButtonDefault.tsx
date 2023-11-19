import { ed25519 } from '@noble/curves/ed25519'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import bs58 from 'bs58'
import { type FC, useCallback, useEffect, useState } from 'react'

import { useNotify } from '@/components/ui/use-notify'

const WalletSignButtonDefault: FC = () => {
  const { publicKey, signMessage, connected } = useWallet()
  const [isSigned, setIsSigned] = useState(false)
  const notify = useNotify()

  const tryToSignMessage = useCallback(async () => {
    try {
      if (!publicKey || !signMessage) {
        return false
      }
      const message = new TextEncoder().encode(
        `${
          window.location.host
        } wants you to sign in with your Solana account:\n${publicKey.toBase58()}\n\nPlease sign in.`
      )

      const signature = await signMessage(message)
      if (!ed25519.verify(signature, message, publicKey.toBytes())) {
        throw new Error('Message signature invalid!')
      }
      notify('success', `Message signature: ${bs58.encode(signature)}`)
      console.log(bs58.encode(signature))

      setIsSigned(true)
    } catch (error: any) {
      notify('error', `Sign Message failed: ${error?.message}`)
    }
  }, [notify, publicKey, signMessage, setIsSigned])

  useEffect(() => {
    console.log('connected is', connected)
    if (connected && !isSigned) {
      tryToSignMessage()
    }
  }, [connected, tryToSignMessage, isSigned])

  useEffect(() => {
    console.log(publicKey?.toBytes())
    console.log(publicKey?.toString())
  }, [publicKey])

  return (
    <div>
      <WalletMultiButton />
    </div>
  )
}

export default WalletSignButtonDefault
