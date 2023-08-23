import { createSlice } from "@reduxjs/toolkit";
// intial state mai token se lunga agr hogi toh agr nhi hogi toh daldunga
// bina local staoarge ke bhi chlega usme initial state mai null daldo
const initialState = {
  // jb tk data nhi aya hoga loading hota rhega backend se data arha hai toh loading true hoga
  signupData: null,
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const Authslice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // jo token arha hai daldo state mai
    setSignupData:(state, action)=> {
      state.signupData = action.payload;
      console.log("signupData= ",state.signupData);

     },
 
    setLoading:(state, action)=> {
     state.loading = action.payload;
     console.log("loading= ",state.loading);
     }
      ,

    setToken:(state,action)=>{
     state.token = action.payload;// return action.payload
      console.log("token= ",state.token);
  }
}}

);

export const { setToken, setLoading, setSignupData } = Authslice.actions;
export default Authslice.reducer;
