import { combineReducers } from "redux";
// Authreducer toh hmne name rhka hai isliye {} aisa nhi kiya
import Authreducer from "../redux/slices/Authslice";
import Likereducer from "../redux/slices/Likeslice";
import Progressreducer from "../redux/slices/Progress";
const rootReducer = combineReducers({
  auth: Authreducer,
  like: Likereducer,
  progressing: Progressreducer,
});

export default rootReducer;
