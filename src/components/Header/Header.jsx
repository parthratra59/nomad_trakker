import React, {  useState, useContext } from 'react';
import './Header.css';
import { FcSearch } from 'react-icons/fc';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, Box, Badge, Avatar } from '@mui/material';
import { SiYourtraveldottv } from 'react-icons/si';
import { BsFillHeartFill } from 'react-icons/bs';
import { InputBase } from '@mui/material';
import { Link, useNavigate,NavLink } from 'react-router-dom'
import { GlobalContext2 } from '../../App'
import { toast } from 'react-hot-toast'
import {  useSelector } from 'react-redux'
import {FaShoppingCart} from 'react-icons/fa'
const Header = ({ setcoordinating }) => {
  const [Autocompleting, setAutocomplete] = useState(null);
  // const [inputValue, setInputValue] = useState('');
  // const [selectedPlace, setSelectedPlace] = useState('');
  // const{setlogin}=useContext(GlobalContext)

  const onloading = (autoC) => {
    setAutocomplete(autoC);
  }
 
  const {isLoggedIn,setIsLoggedIn}=useContext(GlobalContext2)
  const like = useSelector((state) => state.like);
  const handlePlaceSelected = () => {
  

      const place = Autocompleting.getPlace();
      if (place && place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setcoordinating({ lat, lng, });

    }
  };

  // useEffect(() => {
  //   const handleKeyPress = (e) => {
  //     if (e.key === 'Enter') {
  //       handlePlaceSelected();
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyPress);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, [selectedPlace]);

  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  return (
    <>
    
      <AppBar position='static' style={{ backgroundColor: '#8E3A52', userSelect: 'none' }}>
      {/* dekh vohi pattern bhar vala color ke liye  */}
        <Toolbar className='toolbar justify-between items-center '>
        <Link to='/'>
          <Box className='logo'>
          
            <SiYourtraveldottv style={{ fontSize: '40px' }} />
            <Typography className='typo' fontSize={'20px'}>
              Nomad_Trakker
            </Typography>
           
          </Box>
           </Link>
          
                      <Box className='search'>

          <FcSearch style={{ cursor: 'auto', fontSize: '30px' }} />
          <Autocomplete onLoad={onloading} onPlaceChanged={handlePlaceSelected}>
            <InputBase
              className='inputBase'
              placeholder='Search......'

            />
          </Autocomplete>
          </Box>
          <Box className='avatar'>
                  <ul className='flex items-center gap-x-4 '>
                  {!isLoggedIn &&
                    <li>
                      <Link to='/login'>
                      <button className="text-richblack-5 bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700"  onClick={()=>{
                          // setlogin(false)
                        // toast.success("loged in ")
                      }}>
                      Login
                      </button>
                      </Link>
                    </li>
                  }
                  {/* login jb hai toh logout dikhega usko click krke login false hojaega */}
                  {isLoggedIn && 
                    <li>
                      <Link to='/login'>
                      <button className="text-richblack-5 bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700" onClick={()=>{
                         setIsLoggedIn(false)
                        toast.success("Logout Sucessfully");
                      }}>
                      Logout
                      </button>
                      </Link>
                    </li>
                  }
                  {/* { login &&
                    <li>
                      <Link to='/dashboard'>
                      <button  className="text-richblack-5 bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
                      Dashboard
                      </button>
                      </Link>
                    </li>
                  } */}
                  
                    { !isLoggedIn &&
                   
                    <li>
                    {/* app.js mai signup name se tha toh match kr gya route krdiya */}
                      <Link to='/signup'>

                      <button className="text-richblack-5 bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700"  onClick={()=>{
                        
                        // toast.success("Sign Up Successfully!!")

                      

                      }}>
                      Sign up
                      </button>
                      </Link>
                    </li>
                    }
                  </ul>
            <Badge badgeContent={3} color='error'>
            
              <BsFillHeartFill color='success' style={{ fontSize: '25px' }} />
            </Badge>

            <NavLink to='/cart'>
                    {/* kisi bhi chij ko overlapp krana hota toh bhar vale ko relative andr vale ko absolute dete */}
                    <div className='relative'>
                    <FaShoppingCart className='text-2xl'/>
                    {/* nhi toh 0 bhi show hoga */}
                    {like.length>0
                    && <span className='absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white'>{like.length}</span>}
                      </div>
                    </NavLink> 
           
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
