import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { getPasswordToken } from "../../services/operations/authApi";
import "./Spinner.css";

const Forgotpassword = () => {
  const navigate = useNavigate();
  // jb tk backend se data nhi arha hoga tb tk loading hoga
  const { loading } = useSelector((hello) => hello.auth);
  const dispatch = useDispatch();

  const [emailsent, setEmailsent] = useState(false);
  const [email, setEmail] = useState("");

  const move = () => {
    navigate("/login");
  };

  // handle submit jb   mai krunga usme email bhejna hoga
  // email pr link hoga link mai hoga apka token jo aap backend mai bankr aye ho
  // setemail sent isliye paas kiya toh vo setEmailsent true hojaegga and uske baad chije bhi toh chenge krni uski
  // jis se ui cahnge hojae setemail sent true hojaeag toh ui vhnge hojaega
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordToken(email, setEmailsent));

    // setEmail("")
    // / yh krdunga toh mail click krte se hi empty hojaga toh fir email id "" hojaegi toh dikhega
  };

  // fragments lgao  ( ) use kro because agr ek div se jyada hoga toh error dega isliye jb bhi () use kro toh fragments use kro)

  return (
    <>
      <div className=" h-screen w-screen bg-newpink ">
        <div className="drop-shadow-2xl">
          <Header />
        </div>
        <div className="flex flex-col m-auto justify-center h-[80vh]  max-w-[500px] p-4 lg:p-8 text-center">
          {loading ? (
            <div class="custom-loader"></div>
          ) : (
            <>
              <div>
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5 ">
                  {!emailsent ? "Reset your password" : "Check email"}
                </h1>

                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100 flex flex-col">
                  {!emailsent
                    ? "Have no fear. We'll email you instructions to reset your password.If you dont have access to your email we can try account recovery"
                    : `We have sent the reset email to ${email}`}
                </p>
              </div>
              <form className="flex flex-col " onSubmit={handleSubmit}>
                {!emailsent && (
                  <label class="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 text-start">
                      Email Address <sup className="text-richblack-5">*</sup>
                    </p>
                    <input
                      className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none"
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Enter your email address"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </label>
                )}
                <button
                  type="submit"
                  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                >
                  {!emailsent ? "Send email" : "Resend email"}
                </button>
              </form>

              <div className="mt-6 flex items-center justify-between">
                <p class="flex items-center gap-x-2 text-richblack-5">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                  </svg>
                  <button onClick={move}> Back To Login </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
