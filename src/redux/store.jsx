import { configureStore } from "@reduxjs/toolkit";
import Likeslice from "./slices/Likeslice";
const store=configureStore({
    reducer:{
        like: Likeslice,
    }
})
export default store;