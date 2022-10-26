import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core"
import { useBrisePadNFT } from "./useContract";
import { 
    checkCanMint, 
    checkBatchBalance, 
    getNftIds, 
    mintNFT, 
    loadNfts,
    loadUserNfts
} from "../utils/callHelpers";


const useBrisePadNft = () => {
    const { account } = useWeb3React();
    const nftContract = useBrisePadNFT();

    const handleMint = useCallback(
        async (tokenId, amount) => {
            await mintNFT(nftContract, tokenId, amount, account)
        },
        [account, nftContract]
    );

    const handleCheck = useCallback(
        async (tokenId, amount) => {
            const ans = await checkCanMint(nftContract, tokenId, amount, account)
            return ans;
        },
        [account, nftContract]
    );

    const handleBatchBalance = useCallback(
        async (tokenIdArr) => {
            const accountArr = new Array(tokenIdArr.length).fill(account);
            const { batchBal } = await checkBatchBalance(nftContract, accountArr, tokenIdArr);
            return batchBal;
        },
        [nftContract, account]
    );

    const handleLoadNfts = useCallback(
        async () => {
            const nfts = await loadNfts(nftContract);
            return nfts;
        },
        [nftContract]
    );

    const handleLoadUserNfts = useCallback(
        async () => {
            const userNfts = await loadUserNfts(nftContract, account);
            return userNfts;
        },
        [nftContract, account]
    );

    const handleNftIds = useCallback(
        async () => {
            const nftIds = await getNftIds(nftContract);
            return nftIds
        },
        [nftContract]
    );

    return ({ 
        onMint: handleMint,
        onCheck: handleCheck, 
        onBatchBalance: handleBatchBalance,
        onLoadNfts: handleLoadNfts,
        onLoadUserNfts: handleLoadUserNfts,
        onNftIds: handleNftIds
    });

}

export default useBrisePadNft;
