import { combineReducers } from "redux";

import authReducer from "./auth-reducer";
import snackBarReducer from "./snackbar-reducer";

export default combineReducers({
  auth: authReducer,
  snackbar: snackBarReducer,
});
