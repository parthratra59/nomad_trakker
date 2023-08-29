import React,{useCallback} from 'react';
import Header from "../../Header/Header"
import { NavLink,Link,useNavigate } from 'react-router-dom'; // Don't forget to import NavLink
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import Cartitem from "../Cart/Cartitem"
import './Cart.css'

const Cart = () => {
  const like = useSelector((state) => state.like);
  const navigate=useNavigate()

  const back=useCallback(()=>{
    navigate("/")
},[])

// 1.<div> color ka 
// 2. <div mai yh dalo kisi ko bhi bich mai lana hai toh bilkul  h-[calc(100vh-3.5rem)] m-auto w-11/12 max-w-[1080px]  flex items-center justify-center   "kisi "

  
  return (
    <>
      <div className='bg-newpink h-screen'>
      <div className="drop-shadow-2xl">
          <Header />
        </div>
        
        {like?.length === 0 ? (
          <div className="h-[calc(100vh-3.5rem)] m-auto w-11/12 max-w-[1080px]  flex items-center justify-center">
            <div className='py-10'>
              <h1 className="text-gray-700 font-semibold text-xl mb-2">Your cart is empty!</h1>
              
              <button onClick={back} className="uppercase bg-green-600 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-semibold hover:text-green-700 p-3 px-10 tracking-wider">Shop Now</button>
              
            </div>
            </div>
        ) : (
          <div className='max-w-[1400px]  mx-auto flex flex-col md:flex-row justify-center'>
          <Grid container  className=' py-6' style={{userSelect: 'none'}}>
      {/* yh hogya ek trh se container div vala but yh responsive hai 
      same chij */}
      {/* grid ke items mai ab mapping strt hogi images vgrh ki */}
      {like?.map((kuchbhi,index)=>{
         
          return (
            <>
            <Grid md={4} m-auto  xs={12}>
            {/* hme kuch bhi prop use krne se phele vo component ku likhna pdta uska reason important_rendering.txt file mai hai */}
            <Cartitem 
            item={kuchbhi}
          
            
            // hm chate na right side se click kre aur yh scroll hojae toh iska mtlb yh hai 
            // like usne 35 pr click kiya toh index dekhega 35 kha hai aur match krlega 
            

            
            />
     
     
        </Grid>
        <br></br>
      <br></br>
        </>
          )

        })}
        
      </Grid>
     
      </div>
        
        )}
       
      </div>
    </>
  );
};

export default Cart;