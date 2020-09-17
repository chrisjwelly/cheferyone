import {
  SET_RESTAURANT_TAB_INDEX,
  SET_RESTAURANT_TAB_STATE,
} from "../actions/types";

const initialState = { isShown: false, index: 0 };

export default function restaurantTabReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESTAURANT_TAB_INDEX:
      return { ...state, index: action.payload };
    case SET_RESTAURANT_TAB_STATE:
      return { ...state, isShown: action.payload };
    default:
      return state;
  }
}
