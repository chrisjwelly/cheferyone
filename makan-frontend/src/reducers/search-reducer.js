import {
  SET_IS_SHOW_SEARCH_OVERLAY,
  SET_SEARCH_SECTION,
} from "../actions/types";

const initialState = {
  isShowSearchOverlay: false,
  searchSection: "menus",
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_SHOW_SEARCH_OVERLAY:
      return { ...state, isShowSearchOverlay: action.payload };
    case SET_SEARCH_SECTION:
      return { ...state, searchSection: action.payload };
    default:
      return state;
  }
}
