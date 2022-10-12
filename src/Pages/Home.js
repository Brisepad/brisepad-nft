import React from 'react';
import NftToMint from '../components/brisepadnft/NftToMint';

// import { Footer, Header } from '../containers';
// import {  Navbar } from '../components';
import '../App.css';

const NFTs = [
  {
    name: "BrisePad NFT 1",
    imageUrl: "https://image.shutterstock.com/image-illustration/bright-artistic-splashes-abstract-painting-600w-717161425.jpg",
    pricePerNFT: 1000000,
    maxSupply: 100,
    amountMinted: 21,
    maxPerWallet: 2
  },
  {
    name: "BrisePad NFT 2",
    imageUrl: "https://image.shutterstock.com/image-illustration/bright-artistic-splashes-abstract-painting-600w-717161425.jpg",
    pricePerNFT: 2000000,
    maxSupply: 200,
    amountMinted: 32,
    maxPerWallet: 7
  },
  {
    name: "BrisePad NFT 3",
    imageUrl: "https://image.shutterstock.com/image-illustration/bright-artistic-splashes-abstract-painting-600w-717161425.jpg",
    pricePerNFT: 3000000,
    maxSupply: 300,
    amountMinted: 43,
    maxPerWallet: 5
  },
  {
    name: "BrisePad NFT 4",
    imageUrl: "https://image.shutterstock.com/image-illustration/bright-artistic-splashes-abstract-painting-600w-717161425.jpg",
    pricePerNFT: 3000000,
    maxSupply: 300,
    amountMinted: 43,
    maxPerWallet: 4
  },
  {
    name: "BrisePad NFT 4",
    imageUrl: "https://image.shutterstock.com/image-illustration/bright-artistic-splashes-abstract-painting-600w-717161425.jpg",
    pricePerNFT: 3000000,
    maxSupply: 300,
    amountMinted: 43,
    maxPerWallet: 4
  },
  {
    name: "BrisePad NFT 4",
    imageUrl: "https://image.shutterstock.com/image-illustration/bright-artistic-splashes-abstract-painting-600w-717161425.jpg",
    pricePerNFT: 3000000,
    maxSupply: 300,
    amountMinted: 43,
    maxPerWallet: 4
  }
  
]
//{ name, imageUrl, pricePerNFT, maxSupply, amountMinted, maxPerWallet }

const Home = () => (
  <div className="App">
    <div className="gradient__bg">
      <div className='home_nfts'>
        {NFTs.map((nft) => {
          return (
            <NftToMint 
              key={nft.name}
              name={nft.name} 
              imageUrl={nft.imageUrl} 
              pricePerNFT={nft.pricePerNFT} 
              maxSupply={nft.maxSupply} 
              amountMinted={nft.amountMinted} 
              maxPerWallet={nft.maxPerWallet} 
            
            />
          )
        })}
      </div>
    </div>
  </div>
);

export default Home;
