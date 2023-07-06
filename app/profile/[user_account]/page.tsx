'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAddress, useDisconnect, useContract, useOwnedNFTs, ThirdwebNftMedia } from '@thirdweb-dev/react'
import { NFT_ADDRESS } from '@/utils/constants'

const UserProfile = () => {
  const router = useRouter()
  const address = useAddress()
  const disconnect = useDisconnect()

  const { contract } = useContract(NFT_ADDRESS)
  const { data: ownedNFTs, isLoading: ownedNFTsLoading } = useOwnedNFTs(contract, address)

  const signout = () => {
    disconnect()
    router.push('/')
  }

  return (
    <div className='flex-center flex-col gap-3'>
      <h1 className='head_text'>User Profile</h1>
      <button
        onClick={signout}
        className='outline_btn'
      >
        Sign Out
      </button>
      <h3 className='head_text !text-4xl'>Your Passes:</h3>
      {!ownedNFTsLoading && ownedNFTs ? (
        ownedNFTs.length > 0 ? (
          ownedNFTs.map((nft) => (
            <div key={nft.metadata.id} className='flex-center flex-col gap-3'>
              <h2 className='font-bold text-center underline underline-offset-2'>{nft.metadata.name}</h2>
              <p className='text-lg font-semibold'>
                Held: {nft.quantityOwned || 'Login to View'}
              </p>
              <Link href={`/pass/${nft.metadata.id}`}>
                <ThirdwebNftMedia metadata={nft.metadata} />
              </Link>
            </div>
          ))
        ) : (
          <p className='text-lg font-semibold'>
            You don't own any passes yet!
          </p>
        )
      ) : (
        <p className='text-lg font-semibold'>
          Loading...
        </p>
      )}
    </div>
  )
}

export default UserProfile