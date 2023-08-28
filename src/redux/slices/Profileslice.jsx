import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState ={
    // module se arha hai "usermodule.js" se
    // user:Cookies.get("user") || null,
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):null,
    loading:false,
}

const profileSlice =createSlice({
    name:"profile",
    initialState: initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload
            // localStorage.setItem("user",JSON.stringify(value.payload));
           
        },
        setLoading(state,value){
            state.loading=value.payload
        },
    }
});

export const {setUser,setLoading}=profileSlice.actions;
export default profileSlice.reducer;