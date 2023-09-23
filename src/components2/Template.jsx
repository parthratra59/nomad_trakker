import React, { useState, useEffect } from "react";
import Signupform from "./Signupform";
import Loginform from "./Loginform";
import photo from "./assets/frame.png";
// import Maps from "../components/Maps/Maps";
import GoogleMapReact from "google-map-react";
import "./Template.css";
import Header from "../components/Header/Header";
import { Marker } from "@react-google-maps/api";
import Mapstyles from "../components/Maps/Mapstyles";
const Template = ({ title, desc1, desc2, image, formType }) => {
  console.log(formType);

  const [coordinates, setCoordinates] = useState(null);
  // const [bounds, setbounds] = useState({});

  useEffect(() => {
    // mai chata jaise hi khule vo current location pr ajae
    // ise current location khul gya jo hm pop up dekte hai na fir cookies mai jakr enable kr te hai
    // coords bydefault hai
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {const coordinates = {
        lat: latitude,
        lng: longitude,
      };
      setCoordinates(coordinates)
    }
    );
    // [] empty isliye hai atleast ek baar toh chaiye hm current location ke liye
  }, []);

  
 
  

  // Template jo common hoga signup and login mei
  const mapOptions = {
    zoomControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    styles: Mapstyles, // Assign the sty prop directly to styles
  };



  

  return (
    <>
      <div className="bg-newpink h-screen">
        <div className="sticky top-0 drop-shadow-2xl">
          <Header />
        </div>

        {/* iski width navbar jaisi hai toh usme jo kiya vohi */}
        <div className="flex h-[80vh]  w-11/12 max-w-[1160px] py-12 gap-y-0 mx-auto gap-x-12 justify-between parthratra">
          {/* left section  */}
          {/* meri max width 450px decide hogyi */}
          <div className="w-11/12  max-w-[450px] mx-0 text-white ">
            <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] giyan">
              {title}
            </h1>
            <p className="text-[1.125rem] chor text-md mt-4 leading-[1.625rem] giyan">
              <span className="text-richblack-100 ">{desc1}</span>
            </p>


            {/* form add krdiya*/}
            <div className="ooof">
              {formType === "signup" ? <Signupform /> : <Loginform />}
            </div>

            {/* <div className="flex w-full items-center my-4 gap-x-2">
                    <div className="h-[1px] w-full bg-richblack-100"></div>
                    <p className=" font-medium leading-[1.375rem] text-richblack-100">OR</p>
                    <div className="h-[1px] w-full bg-richblack-100"></div>
                    </div> */}

            {/* <button className="w-full flex items-center justify-center rounded-[8px] font-medium text-richblack-100 border-richblack-700 border px-[12px] py-[8px] gap-x-2 mt-6 bg-richblack-800">
                    <FcGoogle />
                    <p>Sign Up with Google</p>
                    </button>
                     */}
          </div>

          {/* right section  */}
          <div className="relative w-11/12 max-w-[450px] please">
            {/* muje dusri vali image overlapp krani thi isliuye bhar vlaa div relative krdiya  andr vala absolute */}
            <img
              src={photo}
              alt="patter"
              width={558}
              height={504}
              loading="lazy"
            />

            <div className="absolute -top-1 right-4  w-[450px] h-[380px]  z-10">
            
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
                  }}
                  defaultZoom={14}
                  defaultCenter={coordinates}
                  center={coordinates}
                  options={mapOptions}
                 
                >
                  <Marker position={coordinates}  zIndex={10} ></Marker>

                </GoogleMapReact>
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
