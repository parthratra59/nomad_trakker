import React, { createContext, useState } from "react";
import Home from "./components2/Home";
import Login from "./components2/Login";
import Signup from "./components2/Signup";
import { Routes, Route } from "react-router-dom";
import Cart from "./components2/Cart";
import Forgotpassword from "./components2/important_pages/Forgotpassword";
import Error from "./components2/important_pages/Errror";
import Resetpassword from "./components2/important_pages/Resetpassword";

import VerifyOTP from  "./components2/important_pages/VerifyOTP"

export const GlobalContext2 = createContext({});
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <GlobalContext2.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/wishlist" element={<Cart />}></Route>
        <Route path="/Forgotpassword" element={<Forgotpassword />}></Route>
        <Route path="*" element={<Error />}></Route>
        <Route path="/resetpassword/:_id" element={<Resetpassword />}></Route>
        <Route path="/verify-email" element={<VerifyOTP />}></Route>
      </Routes>
    </GlobalContext2.Provider>
  );
};

export default App;
