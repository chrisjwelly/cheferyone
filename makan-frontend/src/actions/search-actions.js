import {
  SET_IS_SHOW_SEARCH_OVERLAY,
  SET_SEARCH_SECTION,
} from "./types";

export const setIsShowSearchOverlay = (isShow) => {
  return {
    type: SET_IS_SHOW_SEARCH_OVERLAY,
    payload: isShow,
  };
};

export const setSearchSection = (section) => {
  return { type: SET_SEARCH_SECTION, payload: section };
};
