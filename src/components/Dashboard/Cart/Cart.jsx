import React,{useCallback} from 'react';

import { useNavigate } from 'react-router-dom'; // Don't forget to import NavLink
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import Cartitem from "../Cart/Cartitem"
import './Cart.css'

const Cart = () => {
  const {likeElemets} = useSelector((state) => state.like);
  const navigate=useNavigate()

  const back=useCallback(()=>{
    navigate("/")
},[navigate])

// 1.<div> color ka 
// 2. <div mai yh dalo kisi ko bhi bich mai lana hai toh bilkul  h-[calc(100vh-3.5rem)] m-auto w-11/12 max-w-[1080px]  flex items-center justify-center   "kisi "

  
  return (
    <>
    
        {likeElemets?.length === 0 ? (
          <div className=" m-auto w-11/12 max-w-[1080px]  flex items-center justify-center">
            <div className='mt-4'>
              <h1 className="text-gray-700 font-semibold text-xl mb-2 text-white">Your Adventure Awaits! 🌍 Your Wishlist is Ready to Be Filled with Dream Destinations!</h1>
              <div className='flex justify-center items-center'>
              <button onClick={back} className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-bold text-richblack-900 undefined">Explorer Now</button>
              </div>
              
            </div>
            </div>
        ) : (
          <>
          <div className="flex-1 ">
        <div className="py-6  m-auto w-11/12 max-w-[1080px] ">
          <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
              My Wishlist
            </h1>
          <div className='flex flex-col'>
            {
              likeElemets?.map((item)=>{
                return(
                  <Cartitem item={item} key={item.location_id}/>
                )
              }
         ) }
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