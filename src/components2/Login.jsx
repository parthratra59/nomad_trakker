import React from "react";
import Template from "./Template";
import loginImg from "./assets/login.png";
const Login = () => {
  return (
    // mai template mai data bhejunga vo apne aap krdega jo use krna hai
    <>
      <Template
        title="Welcome Back!!"
        desc1="Forget the Ordinary, Embrace the Extraordinary – Login to Your Travel Realm."
        image={loginImg}
        formType="login"
      />
    </>
  );
};

export default Login;
