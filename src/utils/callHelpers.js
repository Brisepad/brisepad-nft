import BigNumber from 'bignumber.js'
import { ethers } from 'ethers';
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from '../config';
import { nfts as nftArts, MAX_PER_WALLET as walletMax, MAX_SUPPLY as supplyMax, MINT_PRICE as mintPrice } from '../config/constants/nfts';
import { BIG_TEN, BIG_ZERO } from './bigNumber';
import calcMintFee from './calcMintFee';

export const approve = async (lpContract, masterChefContract, account) => {
    return lpContract.methods
        .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
        .send({ from: account })
}

export const sousStake = async (sousChefContract, amount, decimals = 18, account) => {
    return sousChefContract.methods
        .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toFixed())
        .send({ from: account, gas: DEFAULT_GAS_LIMIT })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
    return sousChefContract.methods
        .deposit()
        .send({
        from: account,
        gas: DEFAULT_GAS_LIMIT,
        value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(),
        })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}

export const sousUnstake = async (sousChefContract, amount, decimals, account) => {
    console.log('unstake value: ', new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())

    return sousChefContract.methods
        .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toFixed())
        .send({ from: account, gas: DEFAULT_GAS_LIMIT })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}

export const sousEmergencyUnstake = async (sousChefContract, account) => {
    return sousChefContract.methods
        .emergencyWithdraw()
        .send({ from: account })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}

export const soushHarvest = async (sousChefContract, account) => {
    return sousChefContract.methods
        .deposit('0')
        .send({ from: account, gas: DEFAULT_GAS_LIMIT })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}
  

export const soushHarvestBnb = async (sousChefContract, account) => {
    return sousChefContract.methods
        .deposit()
        .send({ from: account, gas: DEFAULT_GAS_LIMIT, value: BIG_ZERO })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}

export const mintNFT = async (nftContract, tokenId, amount, account) => {
    const mintFee = await calcMintFee(nftContract, amount)

    return nftContract.methods
        .mint(tokenId, amount)
        .send({ from: account, gas: DEFAULT_GAS_LIMIT, value: mintFee.toString()})
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}

export const checkCanMint = async (nftContract, tokenId, amount, account) => {
    const res = await nftContract.methods.checkCanMint(tokenId, amount, account).call();
    return res;
}
export const checkBatchBalance = async (nftContract, accountArr, tokenIdArr) => {
    const nftArray = await nftContract.methods.nftArray().call();
    const batchBal = await nftContract.methods.balanceOfBatch(accountArr, tokenIdArr).call();
    return {batchBal, nftArray};
}

export const getNftIds = async (nftContract) => {
    const nftArray = await nftContract.methods.nftArray().call();
    return nftArray;
}

export const loadNfts = async (nftContract) => {
    const nfts = [];
    nftArts.map((nftArt) => {
        return(async () => {

            // let maxReached = await nftContract.methods.isMaxSupplyReached(nftArt.id).call();
            const maxReached = false;
            if(!maxReached){
                // let uri = await nftContract.methods.uri(id).call();
                // let totalSupply = await nftContract.methods.totalSupply(nftArt.id).call();
                let totalSupply = 4;
                const nft = {
                    id: nftArt.id,
                    name: nftArt.name,
                    image: nftArt.image,
                    walletMax,
                    supplyMax,
                    totalSupply,
                    mintPrice
                };
                nfts.push(nft);
            }
        })();
    });
    // const [walletMax, supplyMax, mintPrice] = await nftContract.methods.getConfigs().call();
    // const ids = await getNftIds(nftContract);

    
    // console.log("nfts", nfts);

    return nfts;

}

export const loadUserNfts = async (nftContract, account) => {
    const nfts = [];
    const ids = await getNftIds(nftContract);
    for(let id of ids){
        let balance = await nftContract.methods.balanceOf(account, id).call();
        if(balance.toNumber() > 0){
            let uri = await nftContract.methods.uri(id).call();
            let nft = {
                id,
                uri,
                balance
            };
            nfts.push(nft);

        }
    }

    return nfts;
}