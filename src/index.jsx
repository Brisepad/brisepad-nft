import React from 'react';
import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core'
import App from './App';
import './index.css';
import { getLibrary } from './utils/web3React';
import { RefreshContextProvider } from './contexts/RefreshContext';


ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <RefreshContextProvider>
            <App />
        </RefreshContextProvider>
    </Web3ReactProvider>,
    document.getElementById('root')
);
