import { useMemo } from 'react';
import { getBrisePadNFTContract } from '../utils/contractHelpers';
import useWeb3 from "./useWeb3"



export const useBrisePadNFT = () => {
    const web3 = useWeb3()
    return useMemo(() => getBrisePadNFTContract(web3), [web3])
}