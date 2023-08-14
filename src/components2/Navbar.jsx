import React, { useContext,useState } from 'react'
import Logo from './assets/Logo.svg'
import { Link, useNavigate } from 'react-router-dom'
// import { GlobalContext } from './Home'
import { GlobalContext } from '../App';
import { toast } from 'react-hot-toast'


const Navbar = () => {
    const {login} =useContext(GlobalContext)
    // piche mai login krke aya hu true

    const{setlogin}=useContext(GlobalContext)

   

//    const navigate=useNavigate()

//    const [Autocompleting, setAutocomplete] = useState(null);

//    const onloading = (autoC) => {
//     setAutocomplete(autoC);
//   }


//    const handlePlaceSelected = () => {
  

//     const place = Autocompleting.getPlace();
//     if (place && place.geometry) {
//       const lat = place.geometry.location.lat();
//       const lng = place.geometry.location.lng();
//       setcoordinating({ lat, lng, });

//   }
// };
  

  // navbar receive kr rha hai toh context api use kr rha 
  return (
    <>
    {/* pure mai hi color dedo na chl */}
        <div >
            <div className='flex mx-auto items-center justify-between w-11/12 max-w-[1160px]  py-4 '>
                <div>
                <Link to={'/'}> 
                  <img src={Logo} width={160} height={32} loading='lazy'></img>
                  </Link>
                </div>
                <div > 
                  

                </div>



                {/* Button - Login = Signup = Logout = Dashboard  */}
                <div>
                  <ul className='flex items-center gap-x-4 '>
                  {/* tukdo mai na todo !false aise nhi krte vha se false arha hai App.js se  */}
                  {/* login nhi hai toh   login vala button dikhega and signup vala fir jb hm signin vale pr krege toh logout and Dashboard aega*/}
                  {!login && 
                    <li>
                      <Link to='/'>
                      <button className="text-richblack-5 bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700"  onClick={()=>{
                          
                        toast.success("loged in ")
                      }}>
                      Login
                      </button>
                      </Link>
                    </li>
                  }
                  {/* login jb hai toh logout dikhega usko click krke login false hojaega */}
                  {login && 
                    <li>
                      <Link to='/login'>
                      <button className="text-richblack-5 bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700" onClick={()=>{
                         setlogin(false);
                        toast.success("Logout Sucessfully");
                      }}>
                      Logout
                      </button>
                      </Link>
                    </li>
                  }
                  { login &&
                    <li>
                      <Link to='/dashboard'>
                      <button  className="text-richblack-5 bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
                      Dashboard
                      </button>
                      </Link>
                    </li>
                  }
                  
                    { !login &&
                   
                    <li>
                    {/* app.js mai signup name se tha toh match kr gya route krdiya */}
                      <Link to='/signup'>

                      <button className="text-richblack-5 bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700"  onClick={()=>{
                        
                        toast.success("Sign Up Successfully!!")

                      

                      }}>
                      Sign up
                      </button>
                      </Link>
                    </li>
                    }
                  </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar