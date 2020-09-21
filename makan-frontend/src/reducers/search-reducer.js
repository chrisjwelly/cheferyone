import {
  SET_SEARCH_PATH,
  SET_SEARCH_TERM,
  SET_SEARCH_STATE,
  SET_IS_SEARCHING,
  SET_SEARCH_SECTION,
} from "../actions/types";

const initialState = {
  term: "",
  isActive: false,
  path: "",
  isSearching: false,
  section: "menus",
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
    case SET_IS_SEARCHING:
      return {
        ...state,
        isSearching: action.payload,
      };
    case SET_SEARCH_SECTION:
      return {
        ...state,
        section: action.payload,
      };
    default:
      return state;
  }
}
