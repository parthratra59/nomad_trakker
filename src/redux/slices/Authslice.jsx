import { createSlice } from "@reduxjs/toolkit";
// intial state mai token se lunga agr hogi toh agr nhi hogi toh daldunga
// bina local staoarge ke bhi chlega usme initial state mai null daldo
const initialState ={
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
}


const Authslice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        // jo token arha hai daldo state mai
        setToken(state, action) {
            state.token = action.payload;
          },
        //   bich mai loading horhi hai isliye loading bhi daldo
          setLoading(state, action) {
            state.loading = action.payload;
          },
        //   data arha hai vo jo hm bhej rhe signup mai daldo backend mai signup se data arha hai
          setSignupData(state, action) {
            state.signupData = action.payload;
          },
        }
    }
)

export const {setToken,setLoading,setSignupData} = Authslice.actions
export default Authslice.reducer
 