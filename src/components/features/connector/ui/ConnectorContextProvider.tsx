import {
  type Adapter,
  WalletAdapterNetwork,
  type WalletError
} from '@solana/wallet-adapter-base'
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react'
import { WalletModalProvider as WalletModalProviderWithReactUI } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets'
import { type SolanaSignInInput } from '@solana/wallet-standard-features'
import { verifySignIn } from '@solana/wallet-standard-util'
import { clusterApiUrl } from '@solana/web3.js'
import { SnackbarProvider, useSnackbar } from 'notistack'
import type { FC, ReactNode } from 'react'
import React, { useCallback, useMemo } from 'react'

import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider'

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { autoConnect } = useAutoConnect()

  const network = WalletAdapterNetwork.Devnet

  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  )

  const { enqueueSnackbar } = useSnackbar()
  const onError = useCallback(
    (error: WalletError, adapter?: Adapter) => {
      enqueueSnackbar(
        error.message ? `${error.name}: ${error.message}` : error.name,
        { variant: 'error' }
      )
      console.error(error, adapter)
    },
    [enqueueSnackbar]
  )

  const autoSignIn = useCallback(async (adapter: Adapter) => {
    if (!('signIn' in adapter)) {
      return true
    }

    const input: SolanaSignInInput = {
      domain: window.location.host,
      address: adapter.publicKey ? adapter.publicKey.toBase58() : undefined,
      statement: 'Sign In to the Contractus App'
    }
    const output = await adapter.signIn(input)

    if (!verifySignIn(input, output)) {
      throw new Error('Sign In verification failed!')
    }

    return false
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        onError={onError}
        autoConnect={autoConnect && autoSignIn}
      >
        <WalletModalProviderWithReactUI>
          {children}
        </WalletModalProviderWithReactUI>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SnackbarProvider>
      <AutoConnectProvider>
        <WalletContextProvider>{children}</WalletContextProvider>
      </AutoConnectProvider>
    </SnackbarProvider>
  )
}
