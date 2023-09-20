import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"

const initialState = {
  cartItems: localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [],
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
      // ...state krne ke baad hi krege hm kbhi bhi original data ke sath ched chad nhi krege newstate ... kreke copy krne ke baad hi purana data usme changes kre
      // /1st way
      // const addingstate={
      //   ...state,
      //   likeElemets: [...state.likeElemets, action.payload],
      // }
      // return addingstate;

      // state.likeElemets.push(action.payload);

      // // only set localStorage if the item is not already there
      // if (!state.likeElemets.some((item) => item.location_id === action.payload)) {
      //   localStorage.setItem("likeElements", JSON.stringify(state.likeElemets));
      // }

      const items= action.payload
      const index= state.cartItems.findIndex((samaya)=>samaya.itemId===items.itemId)
      console.log("indexing",items.itemId)
      if(index>=0){
        toast.error("Course already in Wishlist")
        return 
      }
      
      const addingstate={
        ...state,
        cartItems: [...state.cartItems, action.payload],
      }

      localStorage.setItem("cartItems", JSON.stringify(addingstate.cartItems));
      toast.success("Item added to  Wishlist")
      return addingstate;




     
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

      // please refer this
      // https://chat.openai.com/?model=text-davinci-002-render-sha
      // agr mai direct flter lagaunga then vo pura object filter kr dega 0 aray aega that's why phele ...
      // ...state se copy kro then filter kro ya fir niche jaise kra hai vaise krdo
      // but kb bhi return state.kuch/filter = action.filter nhi krege toh usi line mai return nhi krte
      // because of immutability

      // This ensures that the original data structure is not changed, and that the state is always immutable.
      // idhr apko yh krne ki need nhi hai idhr hmne phele  filter vala apne aap new array crete krta hai
      // toh immutaibity follow krta hai
      //     //     const newState = {
      //   ...state,
      //   likeElemets: state.likeElemets.filter(
      //     (item) => item.location_id !== action.payload
      //   ),
      // };

      // 1st way
      // return state.like.filter((item) => item.location_id !== action.payload);

      // 2nd way
      // ...state krne ke baad hi krege hm kbhi bhi original data ke sath ched chad nhi krege newstate ... kreke copy krne ke baad hi purana data usme changes kre
      const cartId= action.payload
      const index= state.cartItems.findIndex((samaya)=>samaya.itemId===cartId)
     
      console.log("indexing",cartId)
      if(index>=0){
        // If the course is found in the cart, remove it
        state.cartItems.splice(index,1)
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        toast.success("Item deleted from cart");
      }
    },
  },
});
// destructure krlia
export const { add, remove } = likeSlice.actions;

export default likeSlice.reducer;



// //       const newLikeElements = [...state.cartItems]; // Create a copy of the existing array
//       newLikeElements.push(action.payload); // Add the new element to the copy

// // 2.nd way
//  // cartItems: [...state.cartItems, item], same meaning hota hai purana copy kro and push kro new element

//       const adding = {
//         ...state,
//         cartItems: newLikeElements, // Update the state with the new array
//       };
//       localStorage.setItem("cartItems", JSON.stringify(adding.cartItems));
//       console.log("mahakal",adding);
//       return adding;