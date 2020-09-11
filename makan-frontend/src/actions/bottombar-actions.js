import { SET_TAB_INDEX } from "./types";

export const setTabIndex = (index) => {
  return {
    type: SET_TAB_INDEX,
    payload: index,
  };
};
