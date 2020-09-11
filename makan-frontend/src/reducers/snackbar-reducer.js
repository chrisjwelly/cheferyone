import {
  OPEN_ERROR_SNACKBAR,
  CLOSE_ERROR_SNACKBAR,
  OPEN_SUCCESS_SNACKBAR,
  CLOSE_SUCCESS_SNACKBAR,
  CLOSE_ALL_SNACKBARS,
} from "../actions/types";

const initialState = {
  error: {
    isOpen: false,
    message: "",
  },
  success: {
    isOpen: false,
    message: "",
  },
};

export default function snackbarReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ERROR_SNACKBAR:
      return {
        ...state,
        error: {
          isOpen: true,
          message: action.payload,
        },
      };
    case CLOSE_ERROR_SNACKBAR:
      return {
        ...state,
        error: {
          isOpen: false,
          message: "",
        },
      };
    case OPEN_SUCCESS_SNACKBAR:
      return {
        ...state,
        success: {
          isOpen: true,
          message: action.payload,
        },
      };
    case CLOSE_SUCCESS_SNACKBAR:
      return {
        ...state,
        success: {
          isOpen: false,
          message: "",
        },
      };
    case CLOSE_ALL_SNACKBARS:
      return initialState;
    default:
      return state;
  }
}
