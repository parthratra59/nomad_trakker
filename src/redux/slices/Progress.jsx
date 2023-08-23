import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  progress: 0,
};

const loadingBarSlice = createSlice({
  name: "loadingBar",
  initialState,
  reducers: {
    // redux foloow the immutablity immer ka error yh tha ki 
    // mtlb phele mai return (state.progress= action.payload ) kr rha tha uska mtlb yh tha mai 
    // existing data ko cahnge kr rha tha us se data integrity pr baat ajati 
    // toh isko mai add to cart se smjata jb hm add to cart krte to copy data next page pr pauchta uske sath hm cheges krte ki qunatity vgrh vgrh jo main data hai uske sath kbhi nhi krte jidhr add to cart vala button tha
    // https://chat.openai.com/share/f2d00c1e-cc4c-4093-9c3e-3786d283ddf6  iske kari mai answer hai bhaut acah 

    // jo hm yh krte na ...prev purana copy kro then new jo change hua usko bdlo yh vohi hi hai
    // const loadingBarSlice = createSlice({
//   name: "loadingBar",
//   initialState,
//   reducers: {
//     setProgress: (state, action) => {
//       return {
//         ...state,
//         progress: action.payload, // Return a new state object with updated progress
//       };
//     },
//   },
// });

    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { setProgress } = loadingBarSlice.actions;
export default loadingBarSlice.reducer;
