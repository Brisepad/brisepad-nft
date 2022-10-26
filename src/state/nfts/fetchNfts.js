import BigNumber from 'bignumber.js';
import { getAddress, getBrisePadNFTAddress } from "../../utils/addressHelpers";
import multicall from "../../utils/multicall";
import brisePadNftABI from "../../config/abi/brisePadNftABI.json";
import { BIG_ZERO } from '../../utils/bigNumber';
import { getBrisePadNFTContract } from '../../utils/contractHelpers';
import { nfts, MAX_PER_WALLET as walletMax, MAX_SUPPLY as supplyMax, MINT_PRICE as mintPrice } from '../../config/constants/nfts';





export const fetchNfts = async () => {
    const totalSupplies = nfts.map(nft => {
        return {
            address: getBrisePadNFTAddress(),
            name: "totalSupply",
            params: [nft.id]
        };
    });

    
    const nftTotalSupplies = await multicall(brisePadNftABI, totalSupplies);
    if(nftTotalSupplies === undefined){
        return ([]);
    }
    return nfts.map((nft, index) => {
        const supply = nftTotalSupplies[index];
        const tSupply = new BigNumber(supply).toJSON();
        return {
            id: nft.id,
            name: nft.name,
            image: nft.image,
            totalSupply: tSupply,
            isMaxReached: tSupply >= supplyMax,
            walletMax,
            supplyMax,
            mintPrice
        };
    });
}

export const fetchUserNfts = async (account) => {
    const accounts = Array(nfts.length).fill(account);
    const ids = nfts.map(nft => nft.id);
    const nftContract = getBrisePadNFTContract();
    const allBalances = await nftContract.methods.balanceOfBatch(accounts, ids).call();

    return nfts.map((nft, index) => {
        return {
            ...nft,
            balance: new BigNumber(allBalances[index]).toJSON()
            
        };
    }).filter(nft => nft.balance > 0);
}
  