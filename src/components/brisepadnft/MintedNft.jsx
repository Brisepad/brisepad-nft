
import { BASE_BSC_SCAN_URL } from "../../config";
import { getBrisePadNFTAddress } from "../../utils/addressHelpers";
import "./mintedNft.css";


const MintedNft = ({ id, name, image, balance }) => {
    
    return (

        <div className="mintednft_container" style={{color: "white"}}>
            <h3 className="mintednft_name">{name}</h3>            
            <div>
                <img className="mintednft_img" src={image} alt="BrisePad NFT"/>
            </div>
            <div className="mintednft_minting_details">
                {/* <h3 className="mintednft_maxwallet">{maxPerWallet} max per wallet</h3>           */}
                <h3 className="mintednft_nftprice">Balance <span className="mintednft_nftprice_price"> {balance}</span></h3>          
                {/* <h3 className="mintednft_minted">{amountMinted}/{maxSupply}</h3> */}
                {/* <div className="mintednft_addsub">
                    <button className="mintednft_subbtn" onClick={reduce}>-</button>
                    <p className="mintednft_mintamt">{amount}</p>
                    <button className="mintednft_addbtn" onClick={increase}>+</button>
                </div> */}
                <a target='_blank' rel='noreferrer noopener' href={`${BASE_BSC_SCAN_URL}/address/${getBrisePadNFTAddress()}`} className="mintednft_mintbtn">View on Brisescan</a>        
            </div>           
        </div>
    )
}

export default MintedNft