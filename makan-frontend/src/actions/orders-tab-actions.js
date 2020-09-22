import { SET_ORDERS_TAB_INDEX, SET_ORDERS_TAB_STATE } from "./types";

export const setOrdersTabIndex = (index) => {
  return {
    type: SET_ORDERS_TAB_INDEX,
    payload: index,
  };
};

export const setOrdersTabState = (isShown) => {
  return {
    type: SET_ORDERS_TAB_STATE,
    payload: isShown,
  };
};
