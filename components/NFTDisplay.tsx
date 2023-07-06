'use client'

import { NFT_ADDRESS } from '@/utils/constants';
import {
  ThirdwebNftMedia,
  useContract,
  useNFTs,
  useAddress,
  useOwnedNFTs
} from "@thirdweb-dev/react";
import Link from 'next/link';

function NFTDisplay() {
  const address = useAddress();
  const { contract } = useContract(NFT_ADDRESS);
  const { data: ownedNFTs } = useOwnedNFTs(contract, address);
  const { data: nft, isLoading, error } = useNFTs(contract);

  // Handle UI on loading or error
  if (isLoading) return <div>Loading...</div>;
  if (error || !nft) return <div>NFT not found</div>;

  // Add quantityOwned to each NFT if applicable
  const updatedNFTs = nft.map(nftItem => {
    if (!ownedNFTs) return nftItem;
    const ownedNFTItem = ownedNFTs.find(owned => owned.metadata.id === nftItem.metadata.id);

    if (ownedNFTItem) {
      return { ...nftItem, quantityOwned: ownedNFTItem.quantityOwned };
    } else {
      return nftItem;
    }
  });

  return (
    <>
      <h1 className='head_text mb-4'>Available Passes</h1>
      <section className='w-full flex-center gap-6 my-4'>
        {updatedNFTs.length > 0 && (
          updatedNFTs.map((nft) => (
            <div key={nft.metadata.id} className='flex-center flex-col gap-3'>
              <h2 className='font-bold text-center underline underline-offset-2'>{nft.metadata.name}</h2>
              <Link href={`/pass/${nft.metadata.id}`}>
                <ThirdwebNftMedia metadata={nft.metadata} />
              </Link>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default NFTDisplay