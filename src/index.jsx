import React from 'react';
import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core'
import App from './App';
import './index.css';
import { getLibrary } from './utils/web3React';


ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <App />
    </Web3ReactProvider>,
    document.getElementById('root')
);
