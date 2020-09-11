import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";

const initialState = {
  user: {},
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
