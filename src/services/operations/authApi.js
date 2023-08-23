import { toast } from "react-hot-toast";
import { endpoints } from "../apiservice";
import { apiConnector } from "../apiconnector";
import { setLoading } from "../../redux/slices/Authslice";
import { setProgress } from "../../redux/slices/Progress";

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
} = endpoints;

// post ke baad url uske baad body data


// flow of authentication phele signup bhrege then otp  usme se email lega and navigate krega otp vale page maik then verify krega then signup krega vo backend pr jaega then backend pr jane ke baad dispactch ab dispatch kya hai vo redux store mai jake state ko update krta hai aur vo trigger krta hai backend ko ki data arha hai aur backend se data arha hai toh loading true krdo aur loading true krne se spinner chlega aur backend se data arha hai toh loading false krdo aur spinner band krdo aur data arha hai toh toast success krdo aur navigate krdo login page pr aur login page pr jaega toh login bhrege aur login bhrege toh backend pr jaega aur backend pr jaega toh dispatch hoga aur dispatch hoga toh loading true hoga aur loading true hoga toh spinner chlega aur backend se data arha hai toh loading false krdo aur spinner band krdo aur data arha hai toh toast success krdo 

export const sendotp = (email, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    // setLoading true se spinner dikhne lg jaega
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        // chalo ab data ki bari
        email,
        checkUserPresent: true,
      });

      console.log("SENDOTP API RESPONSE............", response);
      // sb backend mai jo hmne api bnai hai uske according .status likh likh kr

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // yh success hai toh success toast

      if (response.status === 200) {
        toast.success("OTP sent successfully");
        navigate("/verify-email");
      }
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      // error?.response agr maine .data frontend se dekho  maine yh likha hua hai toh ?. ke baad vala chlega message backend mai likha
      toast.error(error?.response?.data?.message || "Could not send OTP");
      // progrees pura kr lo 100 hojaeaga toh error ajaega
    }
    dispatch(setLoading(false));
  };
};

export const signup=(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) =>{
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    // setLoading true se spinner dikhne lg jaega
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });
      
      console.log("SIGNUP API RESPONSE............", response);
     
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setProgress(100));
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      dispatch(setProgress(100));
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
      toast.dismiss(toastId)
  };
}

export const getPasswordToken = (email, setEmailsent) => {
  return async (dispatch) => {
    // setLoading true se spinner dikhne lg jaega
    const toastId = toast.loading("Loading...");

    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESETPASSTOKEN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      //   jis se email sent hojae
      setEmailsent(true);
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error);
      toast.error("Failed To Send Reset Email");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    // setLoading true se spinner dikhne lg jaega
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
       
      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};


export const resetPassword =(password,confirmPassword,token,setresetComplete)=>{
  
  return async (dispatch)=>{
    const toastId = toast.loading("Loading...")
    try{
     
      // yh teeno chije mai chje bhej rha hu backend mai
        const response = await apiConnector("POST", RESETPASSWORD_API, {
          password,
          confirmPassword,
          token,

        })

        console.log("RESETPASSWORD API RESPONSE............", response.token);

        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Password Reset Successfully")
        setresetComplete(true)

    }
    catch(error)
    {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))

  }
}