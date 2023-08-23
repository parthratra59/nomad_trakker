import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { NavLink } from "react-router-dom";
import { RxCountdownTimer } from "react-icons/rx";
import OTPInput from "react-otp-input";
import "./Verify.css";

import { signup } from "../../services/operations/authApi";
import { sendotp } from "../../services/operations/authApi"; // Make sure to import correctly
import { useNavigate } from "react-router-dom";

 const VerifyOTP = () => {
  const { loading , signupData} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  // https://www.npmjs.com/package/react-otp-input?activeTab=readme
  // documentation se yh dekho
  // kl ke din signupdata khali pda toh phele signup mai jao usko pura lekr ao

  // In summary, this useEffect is used to ensure that if the signupData is null (meaning the user hasn't provided their signup data), the user is redirected to the '/signup' route. It's a common pattern to perform conditional actions like navigation or data fetching when a component mounts.


  useEffect(() => {

    if(!signupData){
        navigate('/signup');
    }},[])

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your verification logic here
    
    // hmne signupdata jo store pe null pda tha usko bula liya ab usko bhrege then dispatch krenge
    // signup mai jo data hai usko backend mai bhejna hai
    // vo nikal lo

    const {email,confirmPassword,password,lastName,firstName}=signupData;
    console.log("signupdataeamil",signupData.email)
    console.log("signupdatapaswword",signupData.confirmPassword)
    console.log("signupdatapaswword",signupData.password)
    console.log("signupdatapaswword",signupData.lastName)
    console.log("signupdatapaswword",signupData.firstName)
    // dispatch krenge signup mai jo data hai usko backend mai bhejna hai
    // vo nikal lo
    
    dispatch(signup(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      navigate));
      // console.log(dispatch(signUp(firstName,lastName,email,createPassword,confirmPassword,otp)))


  };

  return (
    <>
    <div className="h-screen w-screen bg-newpink">
      <div className="drop-shadow-2xl">
        <Header />
      </div>
      <div className="flex flex-col m-auto justify-center h-[80vh] max-w-[500px] p-4 lg:p-8 text-center">
        {loading ? (
          <div className="custom-loader"></div>
        ) : (
          <>
            <div>
              <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                Verify Email
              </h1>
              <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                A verification code has been sent to you. Enter the code below
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="flex justify-center gap-4">
                  {/* OTP input */}
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    separator={<span className="text-richblack-5">-</span>}
                    inputStyle="w-[30rem] h-[3rem] rounded-[8px] border-[1px] border-richblack-500 text-2xl text-center font-medium  focus:outline-none"
                    focusStyle="border-[2px] border-yellow-500"
                    isInputNum={true}
                    shouldAutoFocus={true}
                    containerStyle="flex justify-center gap-4"
                    renderInput={(props, index) => (
                      <input {...props} key={index} />
                    )}
                  />
                </div>
                <button type="submit" className="w-full bg-yellow-50 py-3 px-6 rounded-[8px] mt-6 font-medium text-richblack-900">
                  Verify Email
                </button>
              </form>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <NavLink to={"/login"}>
                    <p className="flex items-center gap-x-2 text-richblack-5">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                      </svg>{" "}
                      Back To Login
                    </p>
                  </NavLink>
                </div>
                <div>
    
                  <span onClick={()=>dispatch(sendotp(signupData.email))} className="flex items-center gap-x-1 text-richblack-5 cursor-pointer">
                    <RxCountdownTimer/>
                    Resend Code
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default VerifyOTP
