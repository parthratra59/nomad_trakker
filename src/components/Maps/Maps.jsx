import React from 'react';
import GoogleMapReact from 'google-map-react';
import './Maps.css';

import { GlobalContext } from '../../components2/Home';

const Maps = ({setcoordinates,setbounds,coordinates}) => {



  // properties hata do hmko bs test krna tha isliye 
  // isliye static liya tha ab hm props se lerhe jo app se arha hai
  // const properties = {
  //   center: {
  //     lat: 26.2183,
  //     lng: 78.1828,
  //   },
  //   zoom: 14,
  // };

  const mapOptions = {
    zoomControl: true,
    fullscreenControl: true,
    mapTypeControl: true,
  };

  return (
    <div className='Googlemap' style={{ height: '100vh', width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <GoogleMapReact
        // props 
        bootstrapURLKeys={{ key: "AIzaSyAdQB6my0NBM8B0Hmwsi25J_MKs5bI8yw0" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        // hr chiij ek baar mai chl gyi mapoptions
        options={mapOptions}
        onChange={(e)=>{
         setcoordinates({lat:e.center.lat,lng:e.center.lng})
         setbounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw})
        }}
        onChildClick={""}
        margin={[50,50,50,50]}
      />
    </div>
  );
};

export default Maps;



// So, the marginBounds in this context refers to the visible boundaries of the map within the current viewport, and you can use it to track and update the map's center and boundaries based on user interaction.