import { createSlice } from "@reduxjs/toolkit";

// intial state mai token se lunga agr hogi toh agr nhi hogi toh daldunga
// bina local staoarge ke bhi chlega usme initial state mai null daldo
// jb tk data nhi aya hoga loading hota rhega backend se data arha hai toh loading true hoga
const initialState ={
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
     signupData: null,
  loading: false,
}

const authSlice =createSlice({
  // progress slice mai bhaut hiacha explanation hai redux ka
    name:"auth",
    initialState: initialState,
    reducers:{
        setSignupData:(state, value)=> {
            state.signupData = value.payload;
          },
          setLoading:(state, value)=> {
            state.loading = value.payload;
          },
        setToken:(state,value)=>{
            state.token=value.payload
        }
    }
});

export const {setToken,setLoading,setSignupData}=authSlice.actions;
export default authSlice.reducer;
