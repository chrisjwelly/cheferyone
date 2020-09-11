import { SET_TAB_INDEX } from "../actions/types";

const initialState = null;

export default function BottomBarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TAB_INDEX:
      return action.payload;
    default:
      return state;
  }
}
