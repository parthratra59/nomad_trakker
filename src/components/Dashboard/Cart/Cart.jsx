import React, { useCallback, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom"; // Don't forget to import NavLink
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Cartitem from "../Cart/Cartitem";
import { fetchCartData } from "../../../services/operations/likeApi";
import { GlobalContext2 } from "../../../App";
// import { GlobalContext } from "../../../components2/Home";
import "./Cart.css";

const Cart = () => {
  // const {likeElements}=useSelector((state)=>state.like)

  // fetching krege apiservice se
  const { tokenpara } = useSelector((state) => state.auth);
  // const[databasecart, setlikedatabasecart ]=useState([])
  const { cartItems } = useSelector((state) => state.like);
  // isko line ko mai App.js mai bhej rha hu kuki header mai bhi chaniye count muje
  // const [likecart, setlikecart] = useState([]);

  // here mai axios.get and .fetch isliye nhi use kr rhe because vo hm function mai kr ke aye hia apiservice mai

  // fetch vala abhi concept use nhi horha hai fetch hoache se rha hai but comcept sikhna pdega
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const datacartfetch = async () => {
  //   try {
  //     const response = await fetchCartData(tokenpara);
  //     setlikedatabasecart(response);
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error fetching cart data:", error);
  //   }
  // };

  // useEffect(() => {
  //   datacartfetch();
  // }, []);

  const navigate = useNavigate();

  const back = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // 1.<div> color ka
  // 2. <div mai yh dalo kisi ko bhi bich mai lana hai toh bilkul  h-[calc(100vh-3.5rem)] m-auto w-11/12 max-w-[1080px]  flex items-center justify-center   "kisi "

  return (
    <>
      {cartItems?.length === 0 ? (
        <div className=" m-auto w-11/12 max-w-[1080px]  pakistan flex items-center justify-center">
          <div className="mt-2 handup">
            <h1 className="text-gray-700 font-semibold text-xl mb-2 text-white groundsman">
              Dream Destinations Await! 🌍 Start Your Adventure Wishlist Now!
            </h1>
            <div className="flex justify-center items-center seam">
              <button
                onClick={back}
                className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-bold text-richblack-900 runs undefined"
              >
                Explorer Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 tapu">
            <div className="py-6  m-auto w-11/12 max-w-[1080px] ">
              <div>
                <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                  My Wishlist
                </h1>
                <div className="flex flex-col bg-richblack-800 md">
                  {cartItems?.map((item) => {
                    return <Cartitem item={item} key={item.itemId} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
