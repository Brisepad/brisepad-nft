import React, { useEffect, useState } from 'react';
import useRefresh from '../hooks/useRefresh';
import NftToMint from '../components/brisepadnft/NftToMint';
import { fetchNfts } from '../state/nfts/fetchNfts';
import { nfts, MAX_PER_WALLET as walletMax, MAX_SUPPLY as supplyMax, MINT_PRICE as mintPrice } from '../config/constants/nfts';

import '../App.css';
import BigNumber from 'bignumber.js';

/**
 * 
  id: nft.id,
  name: nft.name,
  image: nft.image,
  totalSupply: tSupply,
  isMaxReached: tSupply >= supplyMax,
  walletMax,
  supplyMax,
  mintPrice 
 * 
 */

const Home = () => {
  const [totalSupplies, setTotalSupplies] = useState([]);

  const { fastRefresh } = useRefresh();

  useEffect(() => {
    (async () => {
      const loadedTotalSupplies = await fetchNfts(nfts);
      setTotalSupplies(loadedTotalSupplies);
    })();
  }, [fastRefresh]);

  return(
    <div className="App">
      <div className="gradient__bg">
        <div className='home_nfts'>
          {nfts.map((nft, index) => {
            const supply = totalSupplies.length > 0 ? totalSupplies[index] : 0;
            const tSupply = new BigNumber(supply).toJSON();
             return (
              <NftToMint
                key={nft.id}
                id={nft.id}
                name={nft.name}
                imageUrl={nft.image} 
                pricePerNFT={mintPrice} 
                maxSupply={supplyMax} 
                amountMinted={tSupply} 
                maxPerWallet={walletMax} 
              
              />
            )
             }
          )}
        </div>
      </div>
    </div>
  )
};

export default Home;
