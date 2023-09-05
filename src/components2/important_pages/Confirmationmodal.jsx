import React from "react";
import Iconbutton from "./Iconbutton";
// confirmmodal open hogya
const Confirmationmodal = ({ modalData }) => {
  return (
    <>
      <div>
        <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 z-50 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
          <p className="text-2xl font-semibold text-richblack-5">
            {modalData.text1}
          </p>
          <p className="mt-3 mb-5 leading-6 text-richblack-200">
            {modalData.text2}
          </p>

          {/* ab button chaiye */}
          <div className="flex items-center gap-x-4 ">
            {/* there will be two buttons ek toh simple sa cancel hoga ek logouut jo ki Iconbutton hai  ka */}
            {/* logout hua hai toh apko logout vala function call krna hoga auth.js se  icon button mai onclieck event hoga and  text logout ka uske upr */}
            <Iconbutton
              onClick={modalData?.btn1Handler}
              text={modalData?.btn1Text}
            />
            <button
              className="flex items-center bg-richblack-200 cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold text-richblack-900"
              onClick={modalData?.btn2Handler}
            >
              {modalData?.btn2Text}
            </button>
          </div>
        </div>
        <div className="fixed inset-0 z-10 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm over"></div>
      </div>
    </>
  );
};

export default Confirmationmodal;
