import { toast } from "react-hot-toast";
import { endpoints } from "../apiservice";
import { apiConnector } from "../apiconnector";
import { setLoading, setToken } from "../../redux/slices/Authslice";
import { setProgress } from "../../redux/slices/Progress";
import { setUser } from "../../redux/slices/Profileslice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";


// there are two ways fetch and axios to make api calls CRUD operations ke liye
// fetch is a browser api and axios is a library
// fetch is a promise based api and axios is a promise based library
// dono mai difference yh hai ki axios mai hme .then .catch nhi likhna pdta hai likh bhi skte hai but nhi likhna pdta hai
// dono mai async and await use kr te hai jb ap async and await use krte hai toh apko .then .catch nhi likhna pdta hai

// https://chat.openai.com/share/3658bbeb-0929-449f-8981-617a72165b9e best hai yh isko ek baar ache se sb pdna akri mai jana udhr jyada clear hai




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

// yh response.data hai na it means jo backend se aya hai jm hmne request kri thi signup verifyotp login bla bla ke time request mtlb hmne kuch bheja tha json jitna bhi hai response mai vo data us json mai success success hai ki nhi yh check kr rhe hai
// hm response.data  ke krte it menas hm backned ke json object ki baat kr rhe hai res.data.data items us json mai jo data object hia uski baat kr rhe

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
      // response.data means backend se response aya vo pura json mai jo jo jo object hai then .success usme particular success object ki baat kr rhe hai
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

export const signup = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) => {
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

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

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
        dispatch(setLoading(false))
        throw new Error(response.data.message);
        
      }

      toast.success("Login Successful");
      // token chla gya store mai action.payload mai now ab sb access kr Skate as a statecahnge mai like header

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));

      // const expirationDate = new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000);
      // 10 years same use kro jo backend mai expire time lagaya hai
      // Cookies.set("token", JSON.stringify(response.data.token), { expires: expirationDate });

      // "user" module se arha hai "Usermodule.js se"
      // Cookies.set("user", JSON.stringify(response.data.user), { expires: expirationDate });

      // "token bhi module se arha hai "user" vale store hogya hai na

      // bugs laskta hai token dono jgh store kr rhe hai ek mai kro se
      localStorage.setItem("tokenpara", JSON.stringify(response.data.token));
      localStorage.setItem("hey", JSON.stringify(response.data.user));
      // ek hi chij use kro best hai cookies

      dispatch(setToken(response.data.token));

      // reload hone ke baad bhi data rhega and jb tk token expire nhi hua and delete nhi kiya vo login rhega

      // example
      // instance mai yh hota
      // method,url,data,header,params

      // response.data krte means ab hm data pr agye fir hmne jo backend pr uska data likha databody usko access krte

      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      dispatch(setLoading(false))
      toast.error("Login Failed");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const resetPassword = (
  password,
  confirmPassword,
  token,
  setresetComplete
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      // yh teeno chije mai chje bhej rha hu backend mai
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      console.log("RESETPASSWORD API RESPONSE............", response.token);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Reset Successfully");
      setresetComplete(true);
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error);
      toast.error("Failed To Reset Password");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

// async and await isliye use krte hai ki jb hm koi function call krte hai toh uska response aane tk wait krte hai but isme jrurt hi nhi hai kuch aur chlana thodi hai ki dusre flow ko rokna nhi hai hme kuch wait thodi krana hai toh yh use nhi krte hai

export const logout = (navigate) => {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("tokenpara");
    localStorage.removeItem("hey");
    toast.success("Logged Out");
    navigate("/login");
  };
};
