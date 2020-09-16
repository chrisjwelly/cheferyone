import { combineReducers } from "redux";

import authReducer from "./auth-reducer";
import snackBarReducer from "./snackbar-reducer";
import bottomBarReducer from "./bottombar-reducer";
import restaurantTabReducer from "./restaurant-tab-reducer";

export default combineReducers({
  auth: authReducer,
  snackbar: snackBarReducer,
  activeTab: bottomBarReducer,
  restaurantTab: restaurantTabReducer,
});
