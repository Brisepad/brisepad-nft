import React, {useState} from 'react';

import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from './containers';
import toast, { Toaster } from "react-hot-toast";
import { CTA, Brand, Navbar } from './components';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

//pages
import Home from './Pages/Home';
import UserNFTs from './Pages/UserNFTs';

const App = () => {


  const tOptions = {
    error: {
      style: {
        background: '#ff1a1a',
        color: '#ffffff',
        paddingRight: '30px',
        paddingLeft: '30px',
        fontWeight: '500',
        fontSize: '18px'
      }
    },
    success: {
      style: {
        background: '#059862',
        color: '#ffffff',
        paddingRight: '30px',
        paddingLeft: '30px',
        fontWeight: '500',
        fontSize: '18px'
      }
    }
  };


  return (
    <div className="App">
      <BrowserRouter>
        <div className="gradient__bg">
          <Navbar  />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usernfts" element={<UserNFTs />} />
        </Routes>
        {/* <div style={{ position: 'relative'}}>
        </div> */}
       {/* <Footer /> */}
        <Toaster toastOptions={tOptions} />
      </BrowserRouter>
    </div>
  )
};

export default React.memo(App)

