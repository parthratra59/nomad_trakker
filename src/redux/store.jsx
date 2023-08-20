import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/indexing";
const store= configureStore({
    reducer: rootReducer,
});
export default store;