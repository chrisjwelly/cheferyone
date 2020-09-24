import { combineReducers } from "redux";

import authReducer from "./auth-reducer";
import snackBarReducer from "./snackbar-reducer";
import bottomBarReducer from "./bottombar-reducer";
import restaurantTabReducer from "./restaurant-tab-reducer";
import ordersTabReducer from "./orders-tab-reducer";
import dialogReducer from "./dialog-reducer";
import searchReducer from "./search-reducer";
import locationReducer from "./location-reducer";
import notificationReducer from "./notification-reducer";

export default combineReducers({
  auth: authReducer,
  snackbar: snackBarReducer,
  activeTab: bottomBarReducer,
  restaurantTab: restaurantTabReducer,
  dialog: dialogReducer,
  search: searchReducer,
  ordersTab: ordersTabReducer,
  location: locationReducer,
  notification: notificationReducer,
});
