import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Iconbutton from "../../components2/important_pages/Iconbutton";
import Header from "../Header/Header";
const Myprofile = () => {
  // user mai store hogya hoga na udhr se data leao
  const { hey } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  return (
    <>
     
      
        <div className='mx-auto w-11/12 max-w-[1080px] py-10'>
          <div className="py-10">
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
              My Profile
            </h1>

            {/* section1 justify between*/}
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-8 md:px-12">
              <div className="flex items-center gap-x-4">
                {/* yh image user ki hogi */}
                <img
                  src={hey?.image}
                  alt={hey?.name}
                  className="aspect-square w-[78px] rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-richblack-5">
                    {" "}
                    {hey?.firstName + " " + hey?.lastName}{" "}
                  </p>
                  <p className=" text-[11px] md:text-sm text-richblack-300 md:max-w-full max-w-[220px] break-words">
                    {hey?.email}
                  </p>
                </div>
                <Iconbutton
                  text={"Edit"}
                  onclick={() => {
                    navigate("/dashboard/settings")
                }}/>
              </div>
            </div>






            {/* section2  */}  



          </div>
        </div>
    
    </>
  );
};

export default Myprofile;
