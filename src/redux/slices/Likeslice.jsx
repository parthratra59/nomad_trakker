import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likeElemets: localStorage.getItem("likeElements")? JSON.parse(localStorage.getItem("likeElements")):[],
  totalItems: localStorage.getItem("totalItems")
  ? JSON.parse(localStorage.getItem("totalItems"))
  : 0,
  // likeElemets: [],
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    // reducer function 2 chije lete argument mai
    // state,action
    // state mai imput paramenter mila hai

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
      state.likeElemets.push(action.payload);

      // only set localStorage if the item is not already there
      if (!state.likeElemets.some((item) => item.location_id === action.payload)) {
        localStorage.setItem("likeElements", JSON.stringify(state.likeElemets));
      }
      
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

      // agr mai direct flter lagaunga then vo pura object filter kr dega 0 aray aega that's why phele ...
      // ...state se copy kro then filter kro ya fir niche jaise kra hai vaise krdo 
      // but kb bhi return state.kuch/filter = action.filter nhi krege toh usi line mai return nhi krte
      // because of immutability
      
      // This ensures that the original data structure is not changed, and that the state is always immutable.
      const newLikeElemets = state.likeElemets.filter(
        (item) => item._id !== action.payload
      );
      console.log("nyiellie",newLikeElemets);

      // update state
      state.likeElemets = newLikeElemets;
      // only set localStorage if the item is not already there
      if (!newLikeElemets.some((item) => item._id === action.payload)) {
        localStorage.removeItem("likeElements", JSON.stringify(state.likeElemets));
      }
      console.log("state.likeelements",state.likeElemets)
      
    },
  },
});
// destructure krlia
export const { add, remove} = likeSlice.actions;

export default likeSlice.reducer;