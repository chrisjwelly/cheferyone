import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {
  auth: { user: {} },
  snackbar: {
    error: {
      isOpen: false,
      message: "",
    },
    success: {
      isOpen: false,
      message: "",
    },
    warning: {
      isOpen: false,
      message: "",
    },
  },
  activeTab: null,
  restaurantTab: { isShown: false, index: 0 },
  ordersTab: { isShown: false, index: 0 },
  dialog: { isOpen: false, title: "", body: "", actions: null },
  search: {
    isShowSearchOverlay: false,
    searchSection: "menus",
  },
  location: "loading", // Either false, "loading", or { name: null, lat, lng }
};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
