import React, {  useState } from 'react';
import './Header.css';
import { FcSearch } from 'react-icons/fc';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, Box, Badge, Avatar } from '@mui/material';
import { SiYourtraveldottv } from 'react-icons/si';
import { BsFillHeartFill } from 'react-icons/bs';
import { InputBase } from '@mui/material';

const Header = ({ setcoordinating }) => {
  const [Autocompleting, setAutocomplete] = useState(null);
  // const [inputValue, setInputValue] = useState('');
  // const [selectedPlace, setSelectedPlace] = useState('');


  const onloading = (autoC) => {
    setAutocomplete(autoC);
  }
 

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
        <Toolbar className='toolbar'>
          <Box className='logo'>
            <SiYourtraveldottv style={{ fontSize: '40px' }} />
            <Typography className='typo' fontSize={'20px'}>
              Nomad_Trakker
            </Typography>
          </Box>
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
            <Badge badgeContent={3} color='error'>
              <BsFillHeartFill color='success' style={{ fontSize: '25px' }} />
            </Badge>
            <Avatar sx={{ height: '40px', width: '40px' }}>PR</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
