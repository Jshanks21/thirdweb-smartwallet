'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation'
import { NFT_ADDRESS } from '@/utils/constants';
import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  useAddress,
  useOwnedNFTs,
  usePaperWalletUserEmail,
  ConnectWallet
} from "@thirdweb-dev/react"
import { CheckoutWithCard } from "@paperxyz/react-client-sdk";
import { useRouter } from 'next/navigation';


const NFTDetails = () => {
  const router = useRouter()
  const pathname = usePathname()
  const address = useAddress()
  const email = usePaperWalletUserEmail()

  // Extract the token id from the path & remove extra characters: e.g. /1 -> 1 or e.g. /1/2 -> 1
  const tokenId = pathname.replace(/\D/g, '')

  // Fetch NFT data
  const { contract } = useContract(NFT_ADDRESS)
  const { data: ownedNFTs, isLoading: ownedNFTsLoading } = useOwnedNFTs(contract, address)
  const { data: nft, isLoading: nftLoading, error } = useNFT(contract, tokenId)

  // Handle payment success state
  const [paymentSuccessful, setPaymentSuccessful] = useState(false)
  const handlePaymentSuccess = () => {
    setPaymentSuccessful(true)
  }

  // Handle UI on loading or error
  if (nftLoading) return <div>Loading...</div>;
  if (error || !nft) return <div>NFT not found</div>;

  return (
    <div className='w-full'>
      <section className='w-full flex justify-between gap-3 my-4'>
        {nft && (
          <>
            <div className='w-1/2 flex-center flex-col border border-gray-300 rounded-xl'>
              <ThirdwebNftMedia
                metadata={nft.metadata}
              />
              {!ownedNFTsLoading && ownedNFTs && (
                ownedNFTs.length > 0 && (
                  ownedNFTs.map((nft) => (
                    <div key={nft.metadata.id} className='flex-center flex-col gap-3'>
                      <p className='text-lg font-semibold'>
                        Held: {nft.quantityOwned || 'Login to View'}
                      </p>
                    </div>
                  ))
                )
              )}             
            </div>
            <div className='w-1/2 flex justify-around items-center flex-col border border-gray-300 rounded-xl'>
              <h1 className='head_text text-center'>{nft.metadata.name}</h1>
              <p className='text-lg font-semibold'>
                0.01 ETH
              </p>
              {address && email && tokenId ? (
                !paymentSuccessful ? (
                  <div>
                    <CheckoutWithCard
                      configs={{
                        contractId: "06841822-50ae-438c-8f6d-262757bedc7e", // from Paper dashboard
                        walletAddress: address,
                        contractArgs: {
                          tokenId: tokenId
                        },
                        email: email.data,
                      }}
                      onPaymentSuccess={handlePaymentSuccess}
                    />
                  </div>
                ) : (
                  <div>
                    <h2>Payment Successful!</h2>
                    <button
                      className='outline_btn m-4'
                      onClick={() => router.push(`/profile/${address}`)}
                    >
                      View Passes
                    </button>
                  </div>
                )
              ) : (
                <ConnectWallet
                  btnTitle='Login to Buy'
                  modalTitle='Login to Dakan'
                  className='outline_btn'
                />
              )}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default NFTDetails

/*

test card info:

4242 4242 4242 4242
12/22 123 12345

*/