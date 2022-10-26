
import brisePadNftABI from "../config/abi/brisePadNftABI.json";
import { getBrisePadNFTAddress } from "./addressHelpers";
import web3NoAccount from "./web3";
import { DEFAULT_GAS_PRICE, TESTNET_CHAIN_ID } from "../config";
import { getGasPriceInWei, getSettings } from "./settings";


export const getDefaultGasPrice = () => {
    const chainId = process.env.REACT_APP_CHAIN_ID
    if (chainId === TESTNET_CHAIN_ID) {
        return 10
    }
    return DEFAULT_GAS_PRICE
};

const getContract = (abi, address, web3, account) => {
    const _web3 = web3 ?? web3NoAccount
    const gasPrice = account ? getSettings(account).gasPrice : getDefaultGasPrice()

    return new _web3.eth.Contract(abi, address, {
        gasPrice: getGasPriceInWei(gasPrice).toString(),
    })
}  


export const getBrisePadNFTContract = (web3) => {
    return getContract(brisePadNftABI, getBrisePadNFTAddress(), web3)
}