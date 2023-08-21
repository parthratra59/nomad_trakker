import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

export const Likeslice = createSlice({
  name: "like",
  initialState: initialState,
  reducers: {
    // reducer function 2 chije lete argument mai
    // state,action
    // state mai imput paramenter mila hai
    settotalItems: (state, action) => {
      // state mai jo hai vo totalitems mai daldo
      state.totalItems = action.payload;
    },

    add: (state, action) => {
      // action.payload mai jo hm paas krte na
      // jo bhi hm input parameter send kiya hai na usko hm action.payload se access kr skte
      return [...state, action.payload];
      //    console.log(action.payload)
    },
    remove: (state, action) => {
      // remove mai toh hm filtering krna chate hai
      // state ke andr vo hi vale element ko retain nhi krna jiski id
      // ayi hai because filter hai yh
      // Productitems se arha hai na
      // action.payload mai vo hai jo udhr pass kiya hai
      // Productitem mai
      // action.payload mai id hi arhi hai toh action.payload.id likhne ki need nhi
      console.log(action.payload);
      return state.filter((item) => item.location_id !== action.payload);
    },
  },
});
// destructure krlia
export const { add, remove, settotalItems } = Likeslice.actions;

export default Likeslice.reducer;
