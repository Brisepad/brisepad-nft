import React, { useEffect, useState } from 'react';
import useRefresh from '../hooks/useRefresh';
import NftToMint from '../components/brisepadnft/NftToMint';
import { fetchNfts } from '../state/nfts/fetchNfts';

import '../App.css';


const Home = () => {
  const [nfts, setNfts] = useState([]);
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    (async () => {
      const loadedNfts = await fetchNfts();
      setNfts(loadedNfts);
    })();
  }, [fastRefresh]);

  return(
    <div className="App">
      <div className="gradient__bg">
        <div className='home_nfts'>
          {nfts.map((nft) => {
             return (
              <NftToMint
                key={nft.id}
                id={nft.id}
                name={nft.name}
                imageUrl={nft.image} 
                pricePerNFT={nft.mintPrice} 
                maxSupply={nft.supplyMax} 
                amountMinted={nft.totalSupply} 
                maxPerWallet={nft.walletMax} 
              
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
