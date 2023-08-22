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
     return {

        ...state,
        signupData: action.payload,
     }
      // console.log(state.signupData);
      // return action.payload;

    }
    ,
    //   bich mai loading horhi hai isliye loading bhi daldo
    setLoading:(state, action)=> {
     return {
        ...state,
        loading: action.payload,

     }
      
      // return action.payload
    },
    //   data arha hai vo jo hm bhej rhe signup mai daldo backend mai signup se data arha hai
    setToken:(state,action)=>{
      return {
        ...state,
        token: action.payload,
      }
      // return action.payload
  }
  },
});

export const { setToken, setLoading, setSignupData } = Authslice.actions;
export default Authslice.reducer;
