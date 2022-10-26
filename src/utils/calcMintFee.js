import BigNumber from "bignumber.js"


const calcMintFee = async (nftContract, amount) => {
    const amountBN = new BigNumber(amount)
    const mintPrice = await nftContract.methods.getTokenMintPrice().call()
    const fee = new BigNumber(mintPrice).times(amountBN)
    return fee
}

export default calcMintFee