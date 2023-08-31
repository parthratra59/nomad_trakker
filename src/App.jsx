import React, { createContext, useState } from "react";
import Home from "./components2/Home";
import Login from "./components2/Login";
import Signup from "./components2/Signup";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Dashboard/Cart/Cart";
import Forgotpassword from "./components2/important_pages/Forgotpassword";
import Error from "./components2/important_pages/Errror";
import Resetpassword from "./components2/important_pages/Resetpassword";
import Setting from "./components/Dashboard/Setting";
import VerifyOTP from "./components2/important_pages/VerifyOTP";

import Myprofile from "./components/Dashboard/Myprofile";
import ProtectedRoute from "./components2/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";

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

        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<Myprofile />} />
          {/* <Route path="dashboard/cart" element={<Cart />} /> */}
          <Route path="dashboard/settings" element={<Setting />} />
        </Route>
      </Routes>
    </GlobalContext2.Provider>
  );
};

export default App;
