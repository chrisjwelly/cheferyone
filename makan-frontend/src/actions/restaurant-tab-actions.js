import { SET_RESTAURANT_TAB_INDEX, SET_RESTAURANT_TAB_STATE } from "./types";

export const setRestaurantTabIndex = (index) => {
  return {
    type: SET_RESTAURANT_TAB_INDEX,
    payload: index,
  };
};

export const setRestaurantTabState = (isShown) => {
  return {
    type: SET_RESTAURANT_TAB_STATE,
    payload: isShown,
  };
};
