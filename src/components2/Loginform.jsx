import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setProgress } from "../redux/slices/Progress";
import { login } from "../services/operations/authApi";
// import { setToken } from "../redux/slices/Authslice";

// import { GlobalContext } from './Home'

// import Header from './components/Header/Header';

const Loginform = () => {
  // store mai data bhej rha hu function ke through then receive krega backend and jo state chnage hoga jb vo hoga authapi mai staate change hoga
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({ email: "", password: "" });

  // const navigate=useNavigate()
  const handleinput = (e) => {
    setformdata((prev) => {
      return {
        //sara prev daldo
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const { tokenpara } = useSelector((state) => state.auth);
  // const submitting=(e)=>{
  //     e.preventDefault();
  //     navigate('/')
  //     console.log(...formdata)
  // }

  const [showpassword, setshowpassword] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formdata.email, formdata.password, navigate));
    console.log("elements", tokenpara);
    console.log(
      "hello",
      dispatch(login(formdata.email, formdata.password, navigate))
    );
  };

  // setformdata({
  //     email: "",
  //     password: "",
  //   })
  //  setshowpassword(false)

  // jb ap label ke andr daldete input tag ko toh id ki jrurt nhi hoti iska mtlb hi
  // hota ki input us se conect hogay hai
  return (
    <>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col w-full gap-y-4 mt-8"
      >
        <label htmlFor="email" className="w-full">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address
            <sup className="text-richblack-5">*</sup>
          </p>
          <input
            type="email"
            required
            id="email"
            value={formdata.email}
            placeholder="Enter email address"
            onChange={handleinput}
            name="email"
            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none"
          />
        </label>

        {/* dekh bahr vala relative hai and andr vala absolute hai toh isliye toh eye overlab hogya */}
        <label htmlFor="password" className="w-full relative">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            {/* text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] */}
            Password
            <sup className="text-richblack-5">*</sup>
          </p>

          <input
            type={showpassword ? "text" : "password"}
            required
            value={formdata.password}
            placeholder="Enter Password"
            onChange={handleinput}
            name="password"
            id="password"
            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none"
            // bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5
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

          <Link to="/forgotpassword">
            {/* text size extra small */}
            <p className="text-xs mt-1 text-richblack-100 max-w-max ml-auto">
              Forgot Password
            </p>
          </Link>
        </label>

        {/* bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 */}

        {/* hm yh bhi use krskte hai aur navigate vala bhi  */}
        {/* <Link to={'/dashboard'} element={<Dashboard/>}>
            <button className="">Sign In</button>
            </Link> */}

        <button
          onClick={() => {
            dispatch(setProgress(60));
          }}
          className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </>
  );
};

export default Loginform;
