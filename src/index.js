import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import Path from './Path';
import { Provider } from "react-redux";
import store from "./redux/store";
// dfdfdldfdf
ReactDOM.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer />
        <Toaster />
      </Provider>
    </BrowserRouter>
  </>,
  document.querySelector("#root")
);
