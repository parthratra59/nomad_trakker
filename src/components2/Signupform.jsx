import React,{useContext, useState} from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
// import { GlobalContext } from './Home';
import { GlobalContext2 } from '../App';
const Signupform = () => {
    const{setIsLoggedIn}=useContext(GlobalContext2)
    const navigate=useNavigate()
    const [formData, setformdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        createPassword: "",
        confirmPassword: "",
      });
      const handleinput=(e)=>{
        
        setformdata((prev)=>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    const submitting=(e)=>{
        e.preventDefault();
        if(formData.createPassword!==formData.confirmPassword)
        {
            toast.error("Passwords do not match");
            return;

        }
        else{
            // setlogin(true)
            toast.success("Account Created")
            setIsLoggedIn(true)
            console.log(formData)
            navigate('/')
        }
    }

    const[showpassword,setshowpassword]=useState(false)
    const[showpassword2,setshowpassword2]=useState(false)

  return (
    // isme toh form hi bnaega baki color vgrh ka kaam Template component mai horha hai
    <>
        <form onSubmit={submitting}>

            <div className="flex gap-x-4">
            <label htmlFor='firstName' className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">First Name<sup className="text-richblack-5">*</sup></p> 
                <input  type='text'  id='firstName' required  placeholder="Enter First Name" name='firstName' value={formData.firstName} onChange={handleinput}  className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none" ></input>

            </label>
            <label htmlFor='lastName' className="w-full ">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Last Name<sup className="text-richblack-5">*</sup></p>
                <input type='text' id='lastName' required  placeholder="Enter Last Name" name='lastName' value={formData.lastName} onChange={handleinput}   className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none" ></input>

            </label>
            </div>



            {/* create email address */}
            <label htmlFor='email'>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Email Address<sup>*</sup></p>
                <input type='email' id='email' required  placeholder="Enter Email Address" name='email' value={formData.email} onChange={handleinput}  className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none" >

                </input>
            </label>


            {/* create password and confirm password */}

            <div className="flex gap-x-4">
            {/* create password */}
            <label  htmlFor="createPassword"  className='w-full relative'>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            {/* text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] */}
              Create Password
              <sup className="text-richblack-5">*</sup>
            </p>

            <input
              type={showpassword ? "text" : "password"}
              required
              id='createPassword'
              placeholder="Create Password"
              onChange={handleinput}
              value={formData.createPassword}
              name="createPassword"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none"
            />
            <span
              onClick={() => setshowpassword(!showpassword)}
              className="absolute right-3 top-[38px] cursor-pointer ">
              {showpassword ? (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>



        {/* confirm password */}  


        <label  htmlFor="confirmPassword" className='w-full relative' >
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            {/* text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] */}
              Confirm Password
              <sup className="text-richblack-5">*</sup>
            </p>

            <input
              type={showpassword2 ? "text" : "password"}
              required
              id='confirmPassword'
              placeholder="Confirm Password"
              onChange={handleinput}
              value={formData.confirmPassword}
              name="confirmPassword"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 shadow-md outline-none"
            />
                      <span
              onClick={() => setshowpassword2(!showpassword2)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showpassword2 ? (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </span>

          </label>  
            </div>



            <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 w-full">
          Create Account
        </button>

        </form>
   
    </>
  )
}

export default Signupform