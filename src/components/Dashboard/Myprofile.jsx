import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Iconbutton from "../../components2/important_pages/Iconbutton";
import "./Myprofile.css";
import { deleteAccount } from "../../services/operations/ProfileApi";

const Myprofile = () => {
  // user mai store hogya hoga na udhr se data leao
  const { hey } = useSelector((state) => state.profile);
  const { tokenpara } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  // call back funtion ga diya kro kuck dunction chalana
  const onDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteAccount(tokenpara, dispatch, navigate);
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="flex-1 ">
        <div
          className="py-6  mx-auto w-11/12 max-w-[1080px] motog
       "
        >
          <div className="serious">
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
              My Profile
            </h1>

            {/* section1 justify between*/}
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-8 md:px-12">
              <div className="flex items-center gap-x-4 ">
                {/* yh image user ki hogi */}
                <img
                  src={hey?.image}
                  alt={hey?.name}
                  className="aspect-square w-[78px] rounded-full object-cover"
                />
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-richblack-5">
                    {" "}
                    {hey?.firstName + " " + hey?.lastName}{" "}
                  </p>
                  <p className=" text-[11px] md:text-sm text-richblack-300 md:max-w-full max-w-[220px] break-words hero">
                    {" "}
                    {hey?.email}
                  </p>
                </div>
              </div>
              <div className=" md:block ">
                <Iconbutton
                  text="Edit"
                  onClick={() => {
                    navigate("/dashboard/settings");
                  }}
                ></Iconbutton>
              </div>
            </div>
          </div>

          {/* delete account  */}

          <div className="mt-20 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-3 md:p-8 md:px-12">
            <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-3xl text-pink-200"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </div>
            <div className="flex flex-col space-y-2 w-full delete">
              <h2 className="text-lg font-semibold text-richblack-5">
                Delete Account
              </h2>
              <div className="md:w-3/5 text-pink-25 kaksha">
                <p>Would you like to delete account?</p>
                <p>
                  Deleting your account is permanent and will remove all the
                  contain associated with it.
                </p>
              </div>
              <button
                type="button"
                onClick={onDeleteAccount}
                className="w-fit cursor-pointer italic text-pink-300"
              >
                I want to delete my account.
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myprofile;
