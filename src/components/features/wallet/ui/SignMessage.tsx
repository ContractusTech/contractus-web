'use client'

// import { ed25519 } from '@noble/curves/ed25519'
// import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
// import bs58 from 'bs58'
// import { type FC, useCallback } from 'react'
import { type FC, useEffect } from 'react'

// import { Button } from '@/components/ui/button'
import { useNotify } from '@/components/ui/use-notify'

const SignMessage: FC = () => {
  // const { connection } = useConnection()
  const { publicKey, signMessage } = useWallet()
  const notify = useNotify()

  useEffect(() => {
    console.log(publicKey)
  }, [publicKey])

  // const onClick = useCallback(async () => {
  //   try {
  //     if (!publicKey) {
  //       throw new Error('Wallet not connected!')
  //     }
  //     if (!signMessage) {
  //       throw new Error('Wallet does not support message signing!')
  //     }

  //     const message = new TextEncoder().encode(
  //       `${
  //         window.location.host
  //       } wants you to sign in with your Solana account:\n${publicKey.toBase58()}\n\nPlease sign in.`
  //     )
  //     const signature = await signMessage(message)

  //     if (!ed25519.verify(signature, message, publicKey.toBytes())) {
  //       throw new Error('Message signature invalid!')
  //     }
  //     notify('success', `Message signature: ${bs58.encode(signature)}`)
  //   } catch (error: any) {
  //     notify('error', `Sign Message failed: ${error?.message}`)
  //   }
  // }, [publicKey, signMessage, notify])

  return (
    <div>
      <WalletMultiButton />
    </div>
    // <Button
    //   color="primary"
    //   onClick={onClick}
    //   disabled={!publicKey || !signMessage}
    // >
    //   Sign Message
    // </Button>
  )
}

export default SignMessage
