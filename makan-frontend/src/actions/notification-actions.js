import { SET_DRAWER_STATE } from "./types";

export const setDrawerState = (isOpen) => {
  return {
    type: SET_DRAWER_STATE,
    payload: isOpen,
  };
};
