import { useState } from "react";
import "./NftToMint.css";


const NftToMint = ({ name, imageUrl, pricePerNFT, maxSupply, amountMinted, maxPerWallet }) => {
    const [amount, setAmount] = useState(1);
    const increase = () => {
        setAmount(
            (amount) => {
                if(amount === parseInt(maxPerWallet)) return amount;
                return amount + 1;
            }
        )
    };

    const reduce = () => {
        setAmount(
            (amount) => {
                if(amount === 1) return amount;
                return amount - 1;
            }
        )
    };

    const mintNFT = () => {
        window.alert("NFT Minted!");
    };

    return (
        <div className="nfttomint_container" style={{color: "white"}}>
            <h3 className="nfttomint_name">{name}</h3>            
            <div>
                <img className="nfttomint_img" src={imageUrl} alt="BrisePad NFT"/>
            </div>
            <div className="nfttomint_minting_details">
                <h3 className="nfttomint_maxwallet">{maxPerWallet} max per wallet</h3>          
                <h3 className="nfttomint_nftprice"><span className="nfttomint_nftprice_price">{pricePerNFT}</span> BRISE each</h3>          
                <h3 className="nfttomint_minted">{amountMinted}/{maxSupply}</h3>
                <div className="nfttomint_addsub">
                    <button className="nfttomint_subbtn" onClick={reduce}>-</button>
                    <p className="nfttomint_mintamt">{amount}</p>
                    <button className="nfttomint_addbtn" onClick={increase}>+</button>
                </div>
                <button className="nfttomint_mintbtn" onClick={mintNFT}>Mint</button>        
            </div>           
        </div>
    );
}

export default NftToMint;
