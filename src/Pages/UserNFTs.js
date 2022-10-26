import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import MintedNft from '../components/brisepadnft/MintedNft';
import useRefresh from '../hooks/useRefresh';
import { fetchUserNfts } from '../state/nfts/fetchNfts';

const UserNFTs = () => {
    const [userNfts, setUserNfts] = useState([]);
    const { fastRefresh } = useRefresh();

    const { account } = useWeb3React();
    
    useEffect(() => {
        (async () => {
            if(account !== undefined){
                const loadedNfts = await fetchUserNfts(account);
                setUserNfts(loadedNfts);
            }
        })();
    }, [account, fastRefresh]);
    
    return (
        <div className="App">
            <div className="gradient__bg">
                <div className='user_nfts'>
                    {
                        account === undefined ?
                        <p className='connect_wallet'>Wallet not connected</p>:
                        <>
                            
                            {
                                userNfts.length < 1 
                                ?
                                <p className='no-mintednft'>You have no NFT minted here</p>
                                :
                                userNfts.map(
                                    (nft, index) => {
                                    return(
                                    <MintedNft
                                        key={index}
                                        id={nft.id}
                                        name={nft.name}
                                        image={nft.image}
                                        balance={nft.balance}
                                    />)
                                }
                                )
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserNFTs;
