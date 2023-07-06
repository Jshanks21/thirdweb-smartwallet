'use client'

import { Goerli } from "@thirdweb-dev/chains";
import { SMARTWALLET_FACTORY_ADDRESS } from '@/utils/constants'
import {
  ThirdwebProvider,
  localWallet,
  paperWallet,
  smartWallet
} from "@thirdweb-dev/react";

const PAPER_CLIENT_ID = process.env.NEXT_PUBLIC_PAPER_CLIENT_ID as string;
const FACTORY_ADDRESS = SMARTWALLET_FACTORY_ADDRESS || '0x68d55de4Aa5554719A58A1d360d2c9b2EBD292bA';
const THIRDWEB_API_KEY = process.env.NEXT_PUBLIC_THIRDWEB_API_KEY as string;

const activeChain = Goerli;

const Web3Provider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      supportedWallets={[
        paperWallet({
          clientId: PAPER_CLIENT_ID
        }),
        smartWallet({
          factoryAddress: FACTORY_ADDRESS,
          thirdwebApiKey: THIRDWEB_API_KEY,
          gasless: true,
          personalWallets: [
            localWallet({ persist: true }),
          ]
        }),
      ]}
    >
      {children}
    </ThirdwebProvider>
  )
}

export default Web3Provider