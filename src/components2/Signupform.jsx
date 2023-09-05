import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignupData } from "../redux/slices/Authslice";
import { sendotp } from "../services/operations/authApi";

import "./Signupform.css";

const Signupform = () => {
  const navigate = useNavigate();
  // store mai data bhej rha hu function ke through then receive krega backend and jo state chnage hoga jb vo hoga authapi mai staate change hoga
  const dispatch = useDispatch();

  const [showpassword, setshowpassword] = useState(false);
  const [showpassword2, setshowpassword2] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleinput = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitting = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(emailRegex)) {
      return toast.error(
        "Invalid email format. Please provide a valid email address in the format user@example.com."
      );
    }

    // regex of password
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (!password.match(passwordRegex)) {
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // pura data setSignupdata mai bs uske baad operations mai jakr ek function lgaege us se backend mai chle jaega agr yh nhi krege toh database mai jaega kese
    dispatch(
      setSignupData({ firstName, lastName, email, password, confirmPassword })
    );
    console.log(
      dispatch(
        setSignupData({ firstName, lastName, email, password, confirmPassword })
      )
    );
    // hme email chaiye and navigate hi toh chaiye hme usme apne aap loading ke baad write otp vale function page pr redirect krna
    dispatch(sendotp(formData.email, navigate));

    // reset krdo
  };

  return (
    // isme toh form hi bnaega baki color vgrh ka kaam Template component mai horha hai
    <>
      <form onSubmit={submitting}>
        <div className="flex gap-x-4">
          <label htmlFor="firstName" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name<sup className="text-richblack-5">*</sup>
            </p>
            <input
              type="text"
              id="firstName"
              required
              placeholder="Enter First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleinput}
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none"
            ></input>
          </label>
          <label htmlFor="lastName" className="w-full ">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name<sup className="text-richblack-5">*</sup>
            </p>
            <input
              type="text"
              id="lastName"
              required
              placeholder="Enter Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleinput}
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none"
            ></input>
          </label>
        </div>

        {/* create email address */}
        <label htmlFor="email">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address<sup>*</sup>
          </p>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter Email Address"
            name="email"
            value={formData.email}
            onChange={handleinput}
            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none"
          ></input>
        </label>

        {/* create password and confirm password */}

        <div className="flex gap-x-4">
          {/* create password */}
          <label htmlFor="createPassword" className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              {/* text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] */}
              Create Password
              <sup className="text-richblack-5">*</sup>
            </p>

            <input
              type={showpassword ? "text" : "password"}
              required
              id="password"
              placeholder="Create Password"
              onChange={handleinput}
              value={formData.password}
              name="password"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none"
            />
            <span
              onClick={() => setshowpassword(!showpassword)}
              className="absolute right-3 top-[38px] cursor-pointer "
            >
              {showpassword ? (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          {/* confirm password */}

          <label htmlFor="confirmPassword" className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              {/* text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] */}
              Confirm Password
              <sup className="text-richblack-5">*</sup>
            </p>

            <input
              type={showpassword2 ? "text" : "password"}
              required
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleinput}
              value={formData.confirmPassword}
              name="confirmPassword"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none"
            />
            <span
              onClick={() => setshowpassword2(!showpassword2)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showpassword2 ? (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 w-full"
        >
          Create Account
        </button>
      </form>
    </>
  );
};

export default Signupform;
