import { apiConnector } from "../apiconnector.js";
// import {  settingsEndpoints } from "../apis";
import { toast } from "react-hot-toast";

import { logout } from "../operations/authApi.js";

import { settingsEndpoints } from "../apiservice.js";
import { setLoading } from "../../redux/slices/Authslice.jsx";


const { GET_PROFILE_API, UPDATE_PROFILE_API, DELETE_PROFILE_API } =
  settingsEndpoints;

export const deleteAccount=async(tokenpara,dispatch,navigate)=>{
    const toastId = toast.loading("Deleting...");
        try{
            const response = await apiConnector("DELETE",DELETE_PROFILE_API,null,{
                Authorization:  `Bearer ${tokenpara}`
            })
            console.log("DELETE_ACCOUNT_API API RESPONSE............", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
              }

              toast.success("Account Deleted Successfully");
            dispatch(logout(navigate))
        }
        catch(error){
            console.log("DELETE_ACCOUNT_API API ERROR............", error)
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId);
    }
   


