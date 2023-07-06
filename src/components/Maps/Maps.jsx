import React from 'react';
import GoogleMapReact from 'google-map-react';
import './Maps.css';

const Maps = () => {
  const properties = {
    center: {
      lat: 26.2183,
      lng: 78.1828,
    },
    zoom: 14,
  };

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
        defaultCenter={properties.center}
        center={properties.center}
        defaultZoom={properties.zoom}
        // hr chiij ek baar mai chl gyi mapoptions
        options={mapOptions}
        onChange={""}
        onChildClick={""}
        // margin={[50,50,50,50]}
      />
    </div>
  );
};

export default Maps;
