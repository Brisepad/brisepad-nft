import { Link } from "react-router-dom";
import "./styles/pool.css";

const Pool = ({ pool, userData, stakedPool, library }) => {
    return (
        <div className='pool_container'>
            {
                (
                  pool.sousId === 9 
                  ||
                  pool.sousId === 10
                  ||
                  pool.sousId === 11
                  ||
                  pool.sousId === 12
                )
                && 
                <h3 style={{ color: '#00ff00', marginBottom: '5px'}}>New</h3>
            }
            {/* <h4>Pool Sous ID {pool.sousId}</h4> */}
            <div className='brise_img_container'>
                <img className='brise_img' src={`images/briselogo/brise.png`} alt='brise' />
            </div>
            <p className='stake_text'>Stake {pool.stakingToken.symbol}</p>
            <p className='earn_text'>Earn {pool.earningToken.symbol}</p>
            <br />
            {
                stakedPool.totalStaked === undefined
                ?
                <div className="totalstake-wave"></div>
                :
                //{userData.stakedBalance !== undefined ? Number(Number(userData.stakedBalance)/(10**pool.stakingToken.decimals)).toFixed(3) : 0}
                <p><span className="staked-amt">{(Number(Number(stakedPool.totalStaked)/(10**pool.stakingToken.decimals)).toFixed(3))}</span> {pool.stakingToken.symbol} Staked</p>
            }
            <Link className='pool_select_btn' to={`/pool/${pool.sousId}`}>Select</Link>
        </div>
    );
}

export default Pool;