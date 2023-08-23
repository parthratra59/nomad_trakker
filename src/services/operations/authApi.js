import { toast } from "react-hot-toast"
import { endpoints } from "../apiservice"
import {apiConnector} from "../apiconnector"
import {setLoading} from "../../redux/slices/Authslice"
import { setProgress } from "../../redux/slices/Progress"



// destructure krlia


  
//   sendOtp


// this is the approach jo hm lenge server pr data bhejtw time slice ke through jb hm redux toolkit use kr rhe dispatch vgrh use krege isme ek callback function dalte hai 
// callback finction is also called thunk function 
// yh different isliye lg rha hm usually fetch krte hai toh yh sb nhi krna pdta 
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints


// post ke baad url uske baad body data 

export const sendOtp=(email,navigate)=>{
    return(
            async(dispatch)=>{
                dispatch(setLoading(true))
                try{
                    const response =await apiConnector("POST",SENDOTP_API,{
                        // chalo ab data ki bari
                        email,
                        checkUserPresent:true,
                    })
                    dispatch(setProgress(100))
                    console.log("SENDOTP API RESPONSE............", response)
                        // sb backend mai jo hmne api bnai hai uske according .status likh likh kr

                        if(!response.data.success)
                        {

                            toast.error(response.data.message)
                        }

                        // yh success hai toh success toast

                     if(response.status===200)
                     {
                            toast.success("OTP sent successfully")
                            navigate("/verify-email")
                     }


                }
                catch(error)
                {
                    console.log("SENDOTP API ERROR............", error)
                    // error?.response agr maine .data frontend se dekho  maine yh likha hua hai toh ?. ke baad vala chlega message backend mai likha 
                    toast.error(error?.response?.data?.message || "Something went wrong")
                    // progrees pura kr lo 100 hojaeaga toh error ajaega
                    dispatch(setProgress(100))
                }
                dispatch(setLoading(false))
            }
    )
}


export const signup=(data,navigate)=>{
    return(
        async(dispatch)=>{
            dispatch(setLoading(true))
            try{
                const response =await apiConnector("POST",SIGNUP_API,data)
                dispatch(setProgress(100))
                console.log("SIGNUP API RESPONSE............", response)
                    // sb backend mai jo hmne api bnai hai uske according .status likh likh kr

                    if(!response.data.success)
                    {

                        toast.error(response.data.message)
                    }

                    // yh success hai toh success toast

                 if(response.status===200)
                 {
                        toast.success("Signup successfull")
                        navigate("/login")
                 }

                }
            catch(error)
            {
                console.log("SIGNUP API ERROR............", error)
              
                toast.error(error?.response?.data?.message || "User not created successfully, please try again")
                
                dispatch(setProgress(100))
            }   
            dispatch(setLoading(false))
        }
    )
}

