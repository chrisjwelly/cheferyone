import { SET_DRAWER_STATE } from "../actions/types";

const initialState = { isOpen: false };

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DRAWER_STATE:
      return {
        ...state,
        isOpen: action.payload,
      };
    default:
      return initialState;
  }
}
