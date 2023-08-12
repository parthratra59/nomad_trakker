import React from 'react'
import Signupform from './Signupform'
import Loginform from './Loginform'
import photo from './assets/frame.png'
// import Login from '../pages/Login'
import { FcGoogle } from "react-icons/fc"; 

const Template = ({title,desc1,desc2,image,formType}) => {
    console.log(formType)

    // Template jo common hoga signup and login mei
    
  return (
    <>
        <div className='bg-newpink h-[100%]'>
        {/* iski width navbar jaisi hai toh usme jo kiya vohi */}
            <div className="flex w-11/12 max-w-[1160px] py-12 gap-y-0 mx-auto gap-x-12 justify-between">

                {/* left section  */}
                {/* meri max width 450px decide hogyi */}
                <div  className="w-11/12 max-w-[450px] mx-0 text-white"> 
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">{title}</h1>
                    <p className="text-[1.125rem] mt-4 leading-[1.625rem]">
                        <span className="text-richblack-100">{desc1}</span>
                        <span className="text-blue-100 italic" >{desc2}</span>
                    </p>

                    {/* form add krdiya*/}
                    {formType==="signup"?<Signupform />:
                    <Loginform />}

                    {/* <div className="flex w-full items-center my-4 gap-x-2">
                    <div className="h-[1px] w-full bg-richblack-100"></div>
                    <p className=" font-medium leading-[1.375rem] text-richblack-100">OR</p>
                    <div className="h-[1px] w-full bg-richblack-100"></div>
                    </div> */}

                    {/* <button className="w-full flex items-center justify-center rounded-[8px] font-medium text-richblack-100 border-richblack-700 border px-[12px] py-[8px] gap-x-2 mt-6 bg-richblack-800">
                    <FcGoogle />
                    <p>Sign Up with Google</p>
                    </button>
                     */}

                </div>


                 
                {/* right section  */}
                <div className="relative w-11/12 max-w-[450px]">
                {/* muje dusri vali image overlapp krani thi isliuye bhar vlaa div relative krdiya  andr vala absolute */}
                    <img src={photo}
                        alt="patter"
                        width={558}
                        height={504}
                        loading="lazy"
                    />
                            <img
                            src={image}
                            alt="patter"
                            width={558}
                            height={504}
                            loading="lazy"
                            className="absolute -top-4 right-4 "
                            />

                </div>

            </div>
        </div>
    </>
  )
}

export default Template