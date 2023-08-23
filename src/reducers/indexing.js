import { combineReducers } from "redux";
// Authreducer toh hmne name rhka hai isliye {} aisa nhi kiya
import authReducer from '../redux/slices/Authslice'
import likeSlice from "../redux/slices/Likeslice";
import loadingBarReducer from "../redux/slices/Progress";
const rootReducer = combineReducers({
  auth:authReducer,
  like: likeSlice,
  loadingBar: loadingBarReducer
});

export default rootReducer;
