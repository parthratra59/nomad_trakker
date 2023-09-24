import { apiConnector } from "../apiconnector.js";
// import {  settingsEndpoints } from "../apis";
import { toast } from "react-hot-toast";

import { logout } from "../operations/authApi.js";

import { settingsEndpoints } from "../apiservice.js";
import { setLoading } from "../../redux/slices/Authslice.jsx";
import { setUser } from "../../redux/slices/Profileslice.jsx";

// there are two ways fetch and axios to make api calls CRUD operations ke liye
// fetch is a browser api and axios is a library
// fetch is a promise based api and axios is a promise based library
// dono mai difference yh hai ki axios mai hme .then .catch nhi likhna pdta hai likh bhi skte hai but nhi likhna pdta hai
// dono mai async and await use kr te hai jb ap async and await use krte hai toh apko .then .catch nhi likhna pdta hai

// https://chat.openai.com/share/3658bbeb-0929-449f-8981-617a72165b9e best hai yh isko ek baar ache se sb pdna akri mai jana udhr jyada clear hai

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  DELETE_PROFILE_API,
  UPDATE_PASSWORD_API,
} = settingsEndpoints;

// null likh skte hai bodydata vale mai ya fir omit kr skte hm delte ke time pr koi data bhej nhi rhe hote backend pr toh null likh skte hai
export async function deleteAccount(token, dispatch, navigate) {
  try {
    const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
      Authorisation: `Bearer ${token}`,
    });
    console.log("DELETE_ACCOUNT_API API RESPONSE............", response);

    // yh response.data hai na it means jo backend se aya hai json jitna bhi hai response mai vo data us json mai success success hai ki nhi yh check kr rhe hai
    // hm response.data  ke krte it menas hm backned ke json object ki baat kr rhe hai res.data.data items us json mai jo data object hia uski baat kr rhe

    // sb backend mai jo hmne api bnai hai uske according .status likh likh kr
    // response.data means backend se response aya vo pura json mai jo jo jo object hai then .success usme particular success object ki baat kr rhe hai

    // /data is not defined aisa typeerror arha tha beacuse success ki speeling bacend and frontend mai same mai glt thi
    console.log("daroga", response.data);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Account Deleted Successfully");
    dispatch(logout(navigate));
  } catch (error) {
    console.log("DELETE_ACCOUNT_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
}

// export const getProfile = (tokenpara) => {

// FormData is needed for handling file uploads and constructing data in the multipart/form-data format, which is required for sending files and form fields to a server in HTTP requests. It simplifies the process of working with form data, especially when uploading files, ensuring correct formatting and compatibility with server-side expectations.

// uploading ke liye files vgrh ke FormData use krte hai

// Yes, FormData helps auto-adjust the formatting for sending data, especially when dealing with file uploads. It automatically formats the data in the multipart/form-data format, which is necessary for sending files and form fields in HTTP requests. This means you don't have to manually manage the complex formatting details, making it a convenient and reliable choice for handling file uploads and form data in web applications.

export const updatePfp = async (tokenpara, dispatch, pfp) => {
  const toastId = toast.loading("Uploading...");
  try {
    const formData = new FormData();
    //  same name hai backend se "profilepic" toh yh bhi same name rkhna hai
    console.log("profilepic", pfp);

    formData.append("profilepic", pfp);
    const response = await apiConnector(
      "PUT",
      UPDATE_DISPLAY_PICTURE_API,
      formData,
      {
        Authorisation: `Bearer ${tokenpara}`,
      }
    );
    console.log("response.data.success", response.data.success);
    // console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response)

    console.log(
      "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
      response
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Profile Picture Updated Successfully");
    // response.data backend mai jo json hai usme sb sbb hai data,success,message bla bla usko khelte yh response.data yh response aya hai hai uske andr response.data.data items us json mai jo data object hia uski baat kr rhe ab hm intentionaaly us me ek object hai data uski baat kr rhe then usme updatedimage hai vo bhi ek obhject hai usko open krege usme image hai uski baat kr rhe hai

    // ab hmne change toh krdiya hai backend mai ab hm localstorage mai dalege
    // const imageUrl = response.data.data.image;
    // ab imageUrl mai sb change hochuka tha upr PUT se
    // hey profileslice mai store kr rhe
    // parse krna pdata because Json form mai store krte data because backend mai hai json form mai hai
    // purana vala data spread operator se copy kr rhe then image ko update kr rhe

    // purana lekr ayo ...JSON.parse(localStorage.getItem("hey")) then image ko update kr rhe

    //     Yes, the code you provided seems to be updating the Redux store correctly, assuming that:

    // dispatch is a reference to the dispatch function provided by Redux.
    // You have an action creator like setUser (or any appropriate action) that updates the user's image in your Redux store.

    // iske bina slice mai value jaegi vo update hoegi tbhi toh dikhega na frontend pr slice mai value update hogi toh hi dikhega frontend pr vrna localstorage se dikhene ke liye reload

    const imageUrl = response.data.data.image;
    dispatch(
      setUser({ ...JSON.parse(localStorage.getItem("hey")), image: imageUrl })
    );
    localStorage.setItem(
      "hey",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("hey")),
        image: imageUrl,
      })
    );

    console.log(JSON.parse(localStorage.getItem("hey")).image);
  } catch (error) {
    console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
};

// authApi mai alg trh se paas kiya tha isme  alg trh se paas kr rha vese bhi kr skte usme jaise kiya tha

export const update_names = async (tokenpara, dispatch, formData) => {
  console.log("formData", formData);
  const { firstName, lastName } = formData;
  const toastId = toast.loading("Updating...");
  try {
    const response = await apiConnector(
      "PUT",
      UPDATE_PROFILE_API,
      { firstName, lastName },
      {
        Authorisation: `Bearer ${tokenpara}`,
      }
    );
    console.log("UPDATE_PROFILE_API API RESPONSE............", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Profile Updated Successfully");
    console.log("response.data.data", response.data.data);
    dispatch(
      setUser({
        ...JSON.parse(localStorage.getItem("hey")),
        firstName,
        lastName,
      })
    );
    localStorage.setItem(
      "hey",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("hey")),
        firstName,
        lastName,
      })
    );
  } catch (error) {
    console.log("UPDATE_PROFILE_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
};

// password ko localstoorage mai thodi rhkege security breach hoskti
export const updatePassword = async (tokenpara, password) => {
  const { oldPassword, newPassword } = password;
  console.log("password", password);
  const toastId = toast.loading("Updating...");
  try {
    const response = await apiConnector(
      "PUT",
      UPDATE_PASSWORD_API,
      { oldPassword, newPassword },
      {
        Authorisation: `Bearer ${tokenpara}`,
      }
    );
    console.log("UPDATE_PASSWORD_API API RESPONSE............", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password Updated Successfully");
  } catch (error) {
    console.log("UPDATE_PASSWORD_API API ERROR............", error);
    toast.error(error.response.data.message, "Password change failure");
  }
  toast.dismiss(toastId);
};
