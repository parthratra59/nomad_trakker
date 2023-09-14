import React from "react";
import Template from "./Template";
import signupImg from "./assets/signup.png";
// import tyyar from "../components/pics/"
const Signup = () => {
  return (
    <>
      <Template
        title="!! Begin Your Voyage !!"
        desc1="Your Journey Begins Here. Join Us Now!"
        image={signupImg}
        formType="signup"
      />
    </>
  );
};

export default Signup;
