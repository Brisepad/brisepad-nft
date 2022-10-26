import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../logo.svg';
import truncateWalletAddress from '../../utils/truncateWalletAddress';
import AccountModal from '../wallet/AccountModal';
import { connectorLocalStorageKey } from '../wallet/config';
import WalletModal from '../wallet/WalletModal';
import './navbar.css';
import getNodeUrl, { bitkeepLocalhost } from '../../utils/getRpcUrl';

const Navbar = () => {
  const { login, logout } = useAuth();
  const { active, account, library } = useWeb3React();
  // Change Bitkeep wallet RPC url
  if(library && library._provider.rpc && window?.bitkeep?.ethereum.isBitKeep && window?.bitkeep?.ethereum.isBitEthereum){
    if(library._provider.rpc.rpcUrl === bitkeepLocalhost){
        library._provider.rpc.rpcUrl = getNodeUrl();
        console.log("Nav lib: ", library._provider.rpc.rpcUrl);

    }
  }

  const [toggleMenu, setToggleMenu] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState(false);

  const showToggleMenu = () => {
    setToggleMenu(true);
    setOpenWalletModal(false);
  };

  const closeToggleMenu = () => {
    setToggleMenu(false);
  };

  const showWalletModal = () => {
    setOpenWalletModal(true);
    setToggleMenu(false);
  };

  const closeWalletModal = () => {
    setOpenWalletModal(false);
  };

  const accountLogout = () => {
    logout();
    closeWalletModal();
  };

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      const connectorId = localStorage?.getItem(connectorLocalStorageKey);
      if (connectorId) {
        try {
          login(connectorId);
          // Change Bitkeep wallet RPC url
          if(library && library._provider.rpc && window?.bitkeep?.ethereum.isBitKeep && window?.bitkeep?.ethereum.isBitEthereum){
            if(library._provider.rpc.rpcUrl === bitkeepLocalhost){
              library._provider.rpc.rpcUrl = getNodeUrl();
            }
          }
          window.initWeb3 = library;
          // localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad();
  }, [library, login]);


  return (
    <>
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <NavLink to="/">
            <img style={{ marginBottom: -5 }} src='/images/briselogo/brise-vertical.png' alt="BrisePad" />
          </NavLink>
          {/* <img style={{ marginBottom: -5 }} src={logo} alt="PoolApp" /> */}
          {/* <h2 style={{color: '#ffffff'}}>BrisePad</h2> */}
        </div>
        <div className="gpt3__navbar-links_container">
          <p><NavLink to="/" end>Home</NavLink></p>
          <p><NavLink to="/usernfts">Minted</NavLink></p>
          
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        {/* <p>Get Loan</p> */}
        <button onClick={showWalletModal} type="button">{active ? truncateWalletAddress(account): "Connect"}</button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={closeToggleMenu} />
          : <RiMenu3Line color="#fff" size={27} onClick={showToggleMenu} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
          <p><NavLink onClick={closeToggleMenu} to="/" end>Home</NavLink></p>
          <p><NavLink onClick={closeToggleMenu} to="/usernfts">Minted</NavLink></p>
          {/* <p><NavLink onClick={closeToggleMenu} to="/inactivepools">Finished</NavLink></p> */}
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            {/* <p>Launch Loan App</p> */}
            <button onClick={showWalletModal} type="button">{active ? truncateWalletAddress(account): "Connect"}</button>
          </div>
        </div>
        )}
      </div>
    </div>
    {
      openWalletModal && ( 
        active ?
        <AccountModal account={account} logout={accountLogout} onDismiss={closeWalletModal} />
        :
        <WalletModal login={login} logout={logout} onDismiss={closeWalletModal} />
      )
    }
    </>

  );
};

export default Navbar;
