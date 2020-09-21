import store from "../store";
import {
  SET_SEARCH_TERM,
  SET_SEARCH_STATE,
  SET_SEARCH_PATH,
  SET_IS_SEARCHING,
  SET_SEARCH_SECTION,
} from "./types";

export const setSearchInactive = () => (dispatch) => {
  dispatch(setSearchState(false));
  dispatch(setSearchTerm(""));
};

export const setSearchTerm = (term) => {
  return {
    type: SET_SEARCH_TERM,
    payload: term,
  };
};

export const setSearchState = (isActive) => {
  return {
    type: SET_SEARCH_STATE,
    payload: isActive,
  };
};

export const setSearchPath = (filter, sort) => {
  return {
    type: SET_SEARCH_PATH,
    payload: `/api/v1/${store.getState().search.section}/search?query=${
      store.getState().search.term
    }&filter=${filter}&sort=${sort}`,
  };
};

export const setIsSearching = (isSearching) => {
  return {
    type: SET_IS_SEARCHING,
    payload: isSearching,
  };
};

export const setSearchSection = (section) => {
  return { type: SET_SEARCH_SECTION, payload: section };
};
