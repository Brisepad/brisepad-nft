import { useEffect, useState, useRef } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { getWeb3NoAccount } from '../utils/web3';
import getNodeUrl, { bitkeepLocalhost } from '../utils/getRpcUrl';

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
const useWeb3 = () => {
  const { library } = useWeb3React();
  // library._provider.rpc.rpcUrl = getNodeUrl();

  // Change Bitkeep wallet RPC url
  if(library && library._provider.rpc && window?.bitkeep?.ethereum.isBitKeep && window?.bitkeep?.ethereum.isBitEthereum){
    if(library._provider.rpc.rpcUrl === bitkeepLocalhost){
      library._provider.rpc.rpcUrl = getNodeUrl();
      // console.log("library: ", library);
    }
  }
  window.initWeb3 = library;
  const refEth = useRef(library);
  const [web3, setweb3] = useState(library ? new Web3(library) : getWeb3NoAccount())

  useEffect(() => {
    if (library !== refEth.current) {
      // Change Bitkeep wallet RPC url
      if(library && library._provider.rpc && window?.bitkeep?.ethereum.isBitKeep && window?.bitkeep?.ethereum.isBitEthereum){
        if(library._provider.rpc.rpcUrl === bitkeepLocalhost){
          library._provider.rpc.rpcUrl = getNodeUrl();
          // console.log("library: ", library);
        }
      }
      window.initWeb3 = library;
      // console.log("library: ", library);

      setweb3(library ? new Web3(library) : getWeb3NoAccount());
      refEth.current = library;
    }
  }, [library])

  return web3;
}

export default useWeb3;
