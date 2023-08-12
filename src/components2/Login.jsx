import React from 'react'
import Template from './Template'
import loginImg from './assets/login.png'
const Login = () => {
  return (
    // mai template mai data bhejunga vo apne aap krdega jo use krna hai
    <>
     <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={loginImg}
      formType="login"
      
    />

    </>
  )
}

export default Login