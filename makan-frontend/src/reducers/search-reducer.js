import {
  SET_SEARCH_PATH,
  SET_SEARCH_TERM,
  SET_SEARCH_STATE,
} from "../actions/types";

const initialState = {
  term: "",
  isActive: false,
  path: "/api/v1/menus/search?query=",
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_PATH:
      return {
        ...state,
        path: action.payload,
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        term: action.payload,
      };
    case SET_SEARCH_STATE:
      return {
        ...state,
        isActive: action.payload,
      };
    default:
      return state;
  }
}
