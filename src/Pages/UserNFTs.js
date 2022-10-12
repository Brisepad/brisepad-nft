import React from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import PoolDetail from '../components/pools/PoolDetail';
import pools from '../config/constants/pools';

const UserNFTs = () => {

    const { sousId } = useParams();
    
    const resPools = pools.filter(pool => (pool.sousId === Number(sousId)));
    
    return (
        <div className="App">
            <div className="gradient__bg">
            {/* <PoolDetail pool={resPools[0]} /> */}
            <h4 style={{color: 'white'}}>Your NFTs</h4>
            </div>
        </div>
    );
};

export default UserNFTs;
