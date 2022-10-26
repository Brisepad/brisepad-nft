import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import toast from 'react-hot-toast';
import useBrisePadNft from "../../hooks/useBrisePadNft";
import "./nftToMintStyle.css";


const NftToMint = ({ id, name, imageUrl, pricePerNFT, maxSupply, amountMinted, maxPerWallet }) => {
    const { account } = useWeb3React();
    const [amount, setAmount] = useState(1);
    const [mintLoading, setMintLoading] = useState(false);
    const { onMint, onCheck } = useBrisePadNft();

    const handleMint = async () => {
        try {
            if(account === undefined){
                (() => toast.error("Please connect wallet"))();
                return;
            }
            setMintLoading(true);
            const ans = await onCheck(id, amount);
            if(!ans){
                (() => toast.error("You can't mint this amount"))();
                setMintLoading(false);
                return;
            }
            await onMint(id, amount);
            (() => toast.success("Mint successful"))();
            setMintLoading(false);
        } catch (error) {
            if(error.code === 4001){
                (() => toast.error("Not signed"))();
            }else{
                (() => toast.error("Not minted"))();
            }
            setMintLoading(false);
            
            console.log(error);
        }
    };
    
    const increase = () => {
        setAmount(
            (amount) => {
                if(amount === parseInt(maxPerWallet)) return amount;
                return amount + 1;
            }
        );
    };

    const reduce = () => {
        setAmount(
            (amount) => {
                if(amount === 1) return amount;
                return amount - 1;
            }
        );
    };

    

    return (
        <div className="nfttomint_container" style={{color: "white"}}>
            <h3 className="nfttomint_name">{name}</h3>            
            <div>
                <img className="nfttomint_img" src={imageUrl} alt="BrisePad NFT"/>
            </div>
            <div className="nfttomint_minting_details">
                <h3 className="nfttomint_maxwallet"><span className="nfttomint_nftprice_price">{maxPerWallet}</span> max per wallet</h3>          
                <h3 className="nfttomint_nftprice"><span className="nfttomint_nftprice_price">{pricePerNFT}</span> BRISE each</h3>          
                <h3 className="nfttomint_minted">{amountMinted}/{maxSupply}</h3>
                <div className="nfttomint_addsub">
                    <button className="nfttomint_subbtn" onClick={reduce}>-</button>
                    <p className="nfttomint_mintamt">{amount}</p>
                    <button className="nfttomint_addbtn" onClick={increase}>+</button>
                </div>
                <button disabled={mintLoading} className="nfttomint_mintbtn" onClick={handleMint}>{mintLoading ? <div className="loader"></div>: "Mint"}</button>        
            </div>           
        </div>
    );
}

export default NftToMint
