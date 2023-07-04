'use client'
import { ThirdwebNftMedia, useContract, useNFTs, Web3Button, useAddress, useOwnedNFTs } from "@thirdweb-dev/react";
import { NFT_ADDRESS } from '@/utils/constants'

function NFTDisplay() {
  // Get connected wallet address
  const address = useAddress();
  // Load the NFT contract
  const { contract } = useContract(NFT_ADDRESS);
  // Load the NFTs owned by the connected wallet
  const { data: ownedNFTs } = useOwnedNFTs(contract, address);
  // Load all the NFT metadata from the contract (default max is 100)
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
    <div className='flex w-full justify-around items-center mt-4'>
      {updatedNFTs.length > 0 && (
        updatedNFTs.map((nft) => (
          <div key={nft.metadata.id} className='flex flex-col gap-6'>
            <ThirdwebNftMedia metadata={nft.metadata} />
            <p className='text-center'>{nft.metadata.name}</p>
            <p className='text-center'>ID: {nft.metadata.id}</p>
            <p className='text-center'>You Own: {nft.quantityOwned || 0}</p>
            <p className='text-center'>Minted: {nft.supply}</p>
            <Web3Button
              contractAddress={NFT_ADDRESS}
              action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
              onSuccess={(tx) => {
                console.log(tx);
                alert("Claimed!");
              }}
            >
              Claim
            </Web3Button>
          </div>
        ))
      )}
    </div>
  );
}

export default NFTDisplay