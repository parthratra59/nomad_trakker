import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  // yh bs variable ka kaam krta hai store krne mai baki logic backend frontend se interact krte yh koi bhi object aisa nhi hai logic ki backend se resemble kr rhe hey backend mai nhi hai localstorage frontend mai key bnata "hey" name ki aur value mai jo bhi hai vo store krta hai app Application khol skte inspect mai jakr localstorage mai jakr dekh skte hai
  // user:Cookies.get("user") || null,
  hey: localStorage.getItem("hey")
    ? JSON.parse(localStorage.getItem("hey"))
    : null,

  loading: false,
};



const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.hey = value.payload;
      localStorage.setItem("hey",JSON.stringify(value.payload));
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
