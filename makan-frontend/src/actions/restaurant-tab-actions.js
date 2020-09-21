import { SET_RESTAURANT_TAB_INDEX, SET_RESTAURANT_TAB_STATE } from "./types";

export const setRestaurantTabIndex = (index, history) => {
  switch (index) {
    case 2:
      history.push("/your-restaurant/edit");
      break;
    case 1:
      history.push("/your-restaurant/orders");
      break;
    default:
      history.push("/your-restaurant");
  }

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
