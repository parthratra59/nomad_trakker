import React from "react";
import Template from "./Template";
import signupImg from "./assets/signup.png";
const Signup = () => {
  return (
    <>
      <Template
        title="Guiding Your Footsteps: Your Personal Travel Charmer Awaits!!"
        desc1="Trailblazing Memories: Your Custom Odyssey Begins Now!"
        image={signupImg}
        formType="signup"
      />
    </>
  );
};

export default Signup;
