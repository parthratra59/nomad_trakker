import { combineReducers } from "redux";
// Authreducer toh hmne name rhka hai isliye {} aisa nhi kiya
import authReducer from "../redux/slices/Authslice";
// import likeSlice from "../redux/slices/Likeslice";
// import loadingBarReducer from "../redux/slices/Progress";
import profieReducer from "../redux/slices/Profileslice";
const rootReducer = combineReducers({
  auth: authReducer,
  // like: likeSlice,
  // loadingBar: loadingBarReducer
  profile: profieReducer,
});

export default rootReducer;
