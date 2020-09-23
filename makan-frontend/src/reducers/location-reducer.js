import { SET_LOCATION } from "../actions/types";

const initialState = "loading";

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return action.payload;
    default:
      return state;
  }
}
