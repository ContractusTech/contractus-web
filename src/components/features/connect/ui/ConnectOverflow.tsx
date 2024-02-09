import { WalletName } from '@solana/wallet-adapter-base'
import { PhantomWalletName } from '@solana/wallet-adapter-phantom'
import { SolflareWalletName } from '@solana/wallet-adapter-solflare'
import { FC } from 'react'
import { Connector, useConnect } from 'wagmi'

import BSCIcon from '@/assets/svg/BSCIcon'
import MetamaskIcon from '@/assets/svg/MetamaskIcon'
import PhantomIcon from '@/assets/svg/PhantomIcon'
import SolanaIcon from '@/assets/svg/SolanaIcon'
import SolflareIcon from '@/assets/svg/SolflareIcon'
import WalletConnectIcon from '@/assets/svg/WalletConnect'
import { Button } from '@/components/ui/button'

import { useEvmConnect } from '../model/useEvmConnect'
import { useSolanaConnect } from './SolanaProvider'

export const ConnectOverflow: FC = () => {
  const { connectors } = useConnect()
  const { handleConnect: evmConnect } = useEvmConnect()
  const { handleConnect: solanaConnect } = useSolanaConnect()

  const handleSolanaConnect = async (wallet: WalletName) => {
    try {
      solanaConnect(wallet)
    } catch (error) {
      console.log({ e: error })
    }
  }

  const handleEvmConnect = async (connector: Connector) => {
    try {
      await evmConnect(connector)
    } catch (error) {
      console.log({ e: error })
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[2] flex items-center justify-center bg-[#00000080] backdrop-blur-lg">
      <div className="flex max-w-[200px] flex-col items-center gap-[60px] ">
        <div className="flex flex-col gap-[21px]">
          <p className="text-center text-[#656975]">
            Welcome to Contractus. Please, connect wallet.
          </p>
          <div className="flex flex-col items-center gap-[10px]">
            <Button
              variant={'default'}
              className="group flex w-full items-center gap-[10px] self-center rounded-[7px] bg-blue px-12 py-6 text-[12px] text-secondary-foreground shadow-[0px_1px_0px_0px_#2F4AAB] hover:bg-white/90 hover:text-secondary"
              onClick={() => handleSolanaConnect(PhantomWalletName)}
            >
              <PhantomIcon />
              Phantom
            </Button>

            <Button
              variant={'default'}
              className="group flex w-full items-center gap-[10px] self-center rounded-[7px] bg-blue px-12 py-6 text-[12px] text-secondary-foreground shadow-[0px_1px_0px_0px_#2F4AAB] hover:bg-white/90 hover:text-secondary"
              onClick={() => handleSolanaConnect(SolflareWalletName)}
            >
              <SolflareIcon />
              Solflare
            </Button>

            <div></div>

            <Button
              variant={'default'}
              className="group flex w-full items-center gap-[10px] self-center rounded-[7px] bg-blue px-12 py-6 text-[12px] text-secondary-foreground shadow-[0px_1px_0px_0px_#2F4AAB] hover:bg-white/90 hover:text-secondary"
              onClick={() => handleEvmConnect(connectors[0])}
            >
              <MetamaskIcon />
              Metamask
            </Button>

            <Button
              variant={'default'}
              className="group flex w-full items-center gap-[10px] self-center rounded-[7px] bg-blue px-12 py-6 text-[12px] text-secondary-foreground shadow-[0px_1px_0px_0px_#2F4AAB] hover:bg-white/90 hover:text-secondary"
              onClick={() => handleEvmConnect(connectors[1])}
            >
              <WalletConnectIcon />
              Wallet connect
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[9px]">
          <span className="text-center text-[12px] text-[#656975]">
            Supported blockchains
          </span>
          <div className="flex items-center gap-[8px] ">
            <BSCIcon /> <SolanaIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
