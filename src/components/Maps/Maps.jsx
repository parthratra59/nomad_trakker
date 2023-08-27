import React, { useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Mapstyles from "./Mapstyles";
import { Typography, Paper, Rating } from "@mui/material";
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import "./Maps.css";

import { GlobalContext } from "../../components2/Home";

const Maps = ({ setcoordinates, setbounds, coordinates, places }) => {
  // agr vo photos dekhini ho toh atleast 600px expand cahiye vrna cursor dikhega

  // const isDesktop=useMediaQuery('(min-width:700px)');
  const { sendkrega } = useContext(GlobalContext);
  // eslint-disable-next-line
  const [restaurant, setrestaurant] = useState("");
  useEffect(() => {
    randomimage();
  }, []);

  const randomimage = async () => {
    try {
      const response = await fetch(
        "https://api.unsplash.com/photos/random?query=restaurant&client_id=F3OAn4LX2dMCNiFX6odljvHwl187R1xuUTmD8zS8fi8"
      );
      const data = await response.json();
      const imageUrl = data.urls.regular;
      setrestaurant(imageUrl);
      return imageUrl;
    } catch (err) {
      console.log("image is not coming");
      return err;
    }
  };
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
    // mapTypeControl: true,
    styles: Mapstyles, // Assign the sty prop directly to styles
  };

  return (
    <Paper className="google -z-10" xs={12} style={{ height: "90vh", width: "100%" }}>
      <GoogleMapReact
        // props
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        // hr chiij ek baar mai chl gyi mapoptions
        options={mapOptions}
        onChange={(e) => {
          setcoordinates({ lat: e.center.lat, lng: e.center.lng });
          setbounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        // yh onchild click ek event listener hai hm crd/paper pr click kre toh left side mai
        // means List mai vo pauch jaye usi hotel/restaurnat mai
        // aur yh hoGA lifting state up se
        // when parallel component kaam kar rhe ho ek sath tb yh use hota hai

        onChildClick={(bhai) => sendkrega(bhai)}
        margin={[50, 50, 50, 50]}
      >
        {/* there will be two syntax with return without return 
    with return there is a curly braces
        {places?.map((jagah, index) => {
  return (
    <div
      className="marking"
      style={{ position: 'absolute', left: jagah.longitude, top: jagah.latitude }}
      key={index}
    ></div>
  );
})}

{/* with return there is a curly braces */}
        {/* {places?.map((jagah, index) => (
    <div
      className="marking"
      style={{ position: 'absolute', left: jagah.longitude, top: jagah.latitude }}
      key={index}
    ></div>
  );
)} */}

        {places?.map((jagah, index) => {
          return (
            <div
              className="marking"
              // lat and longitude string hota hai uska number mai mai change kro

              // isi ki vjh se toh dikh rha latitude and longitude kis jgh pr hai
              lat={Number(jagah.latitude)}
              lng={Number(jagah.longitude)}
              key={index}
            >
              {/* {!isDesktop ? (
        <LocationOnOutlinedIcon color="" fontSize="large" />
      ) : ( */}
              {
                <Paper elevation={3} className="papering">
                  <Typography variant="subtitle2" gutterBottom>
                    {jagah.name}
                  </Typography>
                  <img
                    src={jagah.photo ? jagah.photo.images.large.url : ""}
                    className="pointer"
                    alt="Place"
                  />
                  <Rating
                    size="small"
                    value={Number(jagah.rating)}
                    readOnly
                  ></Rating>
                </Paper>
              }
            </div>
          );
        })}
        {/* /google map ke andr hi toh krunga */}
      </GoogleMapReact>
    </Paper>
  );
};

export default Maps;

// So, the marginBounds in this context refers to the visible boundaries of the map within the current viewport, and you can use it to track and update the map's center and boundaries based on user interaction.
