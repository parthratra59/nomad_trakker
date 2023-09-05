import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { updatePfp } from "../../services/operations/ProfileApi";
import { update_names } from "../../services/operations/ProfileApi";
import { toast } from "react-hot-toast";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { updatePassword } from "../../services/operations/ProfileApi";
import "./Setting.css";

const Setting = () => {
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.profile);
  const { tokenpara } = useSelector((state) => state.auth);

  const profileImage = useSelector((state) => state.profile.hey.image);
  const { hey } = useSelector((state) => state.profile);
  const [profilePicture, setprofilePicture] = useState(profileImage);

  // jb ek file/image chaiye hoti then files[0] use krte agr multiple files hota hai toh
  // e.target.file kuch nhi hota files hi use hota
  // createUrl mai bdl do file ko because backend mai url ke form mai hai
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setprofilePicture(URL.createObjectURL(file));
  };

  // hey.firstname and hey.LastName is liye kr rhe statring mai because start

  const [formData, setFormData] = useState({
    firstName: hey.firstName,
    lastName: hey.lastName,
  });

  const handleOnChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const picture = e.target[0].files[0];
    console.log("picture", picture);
    updatePfp(tokenpara, picture);
  };

  const handelAdditionalDetails = (e) => {
    e.preventDefault();
    update_names(tokenpara, formData);
  };

  // regex

  // password

  const [passwordFormData, passwordSetFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleOnChangePassword = (e) => {
    passwordSetFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlePassword = (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (!passwordFormData.newPassword.match(passwordRegex)) {
      return toast.error(
        <div className="error-message">
          <p>
            Password must be at least 8 characters long and must contain at
            least:
          </p>
          <ul>
            <li>atleast one uppercase letter</li>
            <li>atleast one lowercase letter</li>
            <li>atleast one number</li>
            <li>Special characters are allowed</li>
          </ul>
        </div>
      );
    }
    if (passwordFormData.oldPassword === passwordFormData.newPassword) {
      toast.error("Old password and new password cannot be same");
      return;
    } else {
      updatePassword(tokenpara, passwordFormData);
    }
  };

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);

  return (
    <>
      {/* side vala flex-1 lelerha hai  */}
      <div className=" flex-1 ">
        <div className=" py-6 mx-auto w-11/12 max-w-[1080px] ">
          <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
              Edit Profile
            </h1>

            {/* update profile */}
            {/* bhar vala box  */}
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 md:p-8 md:px-12 px-3 py-3 text-richblack-5">
              {/* then andr part ko bich mai lekr ao */}
              <div className="flex items-center gap-x-4">
                {/* then flex kro profileimage and button */}
                <img
                  className="aspect-square w-[78px] rounded-full object-cover"
                  src={profilePicture}
                  alt="profileimage"
                ></img>
                <div className="space-y-2">
                  <p>Change Profile Picture</p>
                  <form onSubmit={handleUpload}>
                    <div className="flex gap-3">
                      <label
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'"
                        htmlFor="upload"
                      >
                        Select
                        <input
                          id="upload"
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/png, image/gif, image/jpeg"
                        />
                      </label>

                      <button
                        type="submit"
                        className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 "
                      >
                        <span className="false">Upload</span>
                        <FiUpload />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* 2nd section */}
            <form onSubmit={handelAdditionalDetails}>
              <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <h2 className="text-lg font-semibold text-richblack-5">
                  Profile Information
                </h2>

                <div className="flex flex-col gap-5 lg:flex-row">
                  {/* muje label and input ek ke niche ek rhkna */}
                  <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label className="lable-style " htmlFor="firstname">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      placeholder="Enter First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleOnChange}
                      className="form-style outline-none"
                      required
                    />
                  </div>

                  {/* last name {/* muje label and input ek ke niche ek rhkna */}
                  <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label className="lable-style " htmlFor="lastname">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      placeholder="Enter Last Name"
                      name="lastName"
                      value={formData.lastName}
                      className="form-style outline-none"
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                  onClick={() => {
                    navigate("/dashboard/my-profile");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>

            {/* 3rd section */}
            <form onSubmit={handlePassword}>
              <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <h2 className="text-lg font-semibold text-richblack-5">
                  Password
                </h2>

                <div className="flex flex-col gap-5  lg:flex-row ">
                  {/* muje label and input ek ke niche ek rhkna */}
                  <div className="flex flex-col gap-2 lg:w-[48%] relative">
                    <label className="lable-style " htmlFor="oldPassword">
                      Current Password
                    </label>
                    <input
                      type={showOldPassword ? "text" : "password"}
                      id="oldPassword"
                      placeholder="Enter Current Password"
                      name="oldPassword"
                      value={passwordFormData.oldPassword}
                      onChange={handleOnChangePassword}
                      className="form-style outline-none"
                      required
                    />

                    <span
                      onClick={() =>
                        setShowOldPassword(
                          (showOldPassword) => !showOldPassword
                        )
                      }
                      className="absolute right-3 top-11 z-[10] cursor-pointer"
                    >
                      {showOldPassword ? (
                        <AiOutlineEye
                          fontSize={24}
                          fill="#AFB2BF"
                          color="white"
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          fontSize={24}
                          fill="#AFB2BF"
                          color="white"
                          className=""
                        />
                      )}
                    </span>
                  </div>

                  {/* last name {/* muje label and input ek ke niche ek rhkna */}
                  <div className="flex flex-col gap-2 lg:w-[48%] relative">
                    <label className="lable-style " htmlFor="newPassword">
                      New Password
                    </label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      placeholder="Enter New Password"
                      name="newPassword"
                      value={passwordFormData.newPassword}
                      className="form-style outline-none"
                      onChange={handleOnChangePassword}
                      required
                    />

                    <span
                      onClick={() =>
                        setShowNewPassword(
                          (showNewPassword) => !showNewPassword
                        )
                      }
                      className="absolute  right-3 top-11 z-[10] cursor-pointer"
                    >
                      {showNewPassword ? (
                        <AiOutlineEye
                          fontSize={24}
                          fill="#AFB2BF"
                          color="white"
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          fontSize={24}
                          fill="#AFB2BF"
                          color="white"
                          className=""
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                  onClick={() => {
                    navigate("/dashboard/my-profile");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
