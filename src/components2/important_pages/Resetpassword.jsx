import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Header from "../../components/Header/Header";
import { resetPassword } from "../../services/operations/authApi";
import { toast } from "react-hot-toast";
import "./resetpassword.css";
const Resetpassword = () => {
  const location = useLocation();

  const [formdata, setformdata] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleinput = (e) => {
    setformdata((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const { loading } = useSelector((hello) => hello.auth);
  const dispatch = useDispatch();
  const [resetComplete, setresetComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // url mai token hoga jb link ko mail pr jakr click kre usko extract kro

  // yh token mai url se extract krra hu
  // https://studynotion-edtech-project.vercel.app/update-password/46c8004fa3480d63115857b2a4a21294b03f0715
  // -1 isliye piche se utha rha hu kyuki last mai token hoga
  const token = location.pathname.split("/").at(-1);

  // yh token expiration time mai url se extract krra hu

  const handleSubmit = (e) => {
    e.preventDefault();
    // setresetComplete agar (true); hojaega toh ui change hojaega
    // regerx use krke check krra hu ki password mai kya kya hai
    // password mai kya kya hai
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(formdata.password)) {
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
    if (formdata.password === formdata.confirmPassword) {
      console.log("token", token);
      dispatch(
        resetPassword(
          formdata.password,
          formdata.confirmPassword,
          token,
          setresetComplete
        )
      );
    } else {
      toast.error("Password and Confirm Password must be same");
    }
  };

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
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                  {!resetComplete ? "Choose  new password" : "Reset complete!"}
                </h1>
                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                  {
                    //jb resetcomplete false haiEnter your new password below aega
                    !resetComplete
                      ? "Enter your new password below"
                      : "Your password has been reset successfully"
                  }
                </p>

                {/* form data condition */}
                <form onSubmit={handleSubmit}>
                  {!resetComplete && (
                    <>
                      <div className="relative mt-4">
                        <label htmlFor="password" className="w-full">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 text-start">
                            New Password{" "}
                            <sup className="text-richblack-5">*</sup>
                          </p>
                          <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formdata.password}
                            onChange={handleinput}
                            id="password"
                            placeholder="Enter New Password"
                            style={{
                              boxShadow:
                                "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none"
                          />
                        </label>
                        <span
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-9 z-[10] cursor-pointer"
                        >
                          {!showPassword ? (
                            <AiOutlineEyeInvisible
                              fontSize={24}
                              fill="#AFB2BF"
                              color="white"
                              className=""
                            />
                          ) : (
                            <AiOutlineEye
                              fontSize={24}
                              fill="#AFB2BF"
                              color="white"
                            />
                          )}
                        </span>
                      </div>
                      <div className=" relative mt-4">
                        <label htmlFor="confirmPassword" class="w-full">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 text-start">
                            Confirm Password{" "}
                            <sup className="text-richblack-5">*</sup>
                          </p>
                          <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formdata.confirmPassword}
                            onChange={handleinput}
                            placeholder="Enter Confirm Password"
                            id="confirmPassword"
                            style={{
                              boxShadow:
                                "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none"
                          />
                        </label>
                        <span
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-[38px] cursor-pointer "
                        >
                          {!showConfirmPassword ? (
                            <AiOutlineEyeInvisible
                              fontSize={24}
                              fill="#AFB2BF"
                              color="white"
                              className=""
                            />
                          ) : (
                            <AiOutlineEye
                              fontSize={24}
                              fill="#AFB2BF"
                              color="white"
                            />
                          )}
                        </span>
                      </div>

                      {/* button conditon  */}

                      {!resetComplete ? (
                        <>
                          {/* //jb resetcomplete false h */}
                          <button
                            type="submit"
                            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                          >
                            Reset Password
                          </button>
                        </>
                      ) : (
                        <>
                          <Link to={"/login"}>
                            <button className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                              Return to login
                            </button>
                          </Link>
                        </>
                      )}
                    </>
                  )}
                </form>
                <div className="mt-6 flex items-center justify-between">
                  <Link to={"/login"}>
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
                      </svg>{" "}
                      Back To Login
                    </p>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Resetpassword;
