import React from "react";
import Template from "./Template";
import loginImg from "./assets/login.png";
// import loginImg2 from "../components/pics/"
const Login = () => {
  return (
    // mai template mai data bhejunga vo apne aap krdega jo use krna hai
    <>
      <Template
        title="!! Welcome Back !!"
        desc1="Open the Door to Your Travel World!"
        image={loginImg}
        formType="login"
      />
    </>
  );
};

export default Login;
