import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {Toaster}  from 'react-hot-toast';
// import Path from './Path';

ReactDOM.render(
  <>
  <BrowserRouter>
  <App/>
  <ToastContainer/>
  <Toaster/>
  </BrowserRouter>
  </>,document.querySelector('#root')
)

