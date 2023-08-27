import React from "react";
import { PiSmileySadLight } from "react-icons/pi";

const Errror = () => {
  return (
    <>
      <div className="bg-newpink ">
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center ">
          <PiSmileySadLight className="text-white text-9xl" />
          <p className=" text-white font-bold text-4xl">Error-404</p>
          <br />
          <p className=" text-white font-bold text-4xl">PAGE NOT FOUND</p>
        </div>
      </div>
    </>
  );
};

export default Errror;
