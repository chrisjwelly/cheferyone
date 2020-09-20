import { SET_SEARCH_TERM, SET_SEARCH_STATE, SET_SEARCH_PATH } from "./types";

export const setSearchTerm = (term) => {
  return {
    type: SET_SEARCH_TERM,
    payload: term,
  };
};

export const setSearchTerm = (isActive) => {
  return {
    type: SET_SEARCH_STATE,
    payload: isActive,
  };
};

export const setSearchPath = (pathString) => {
  return {
    type: SET_SEARCH_PATH,
    payload: pathString,
  };
};
