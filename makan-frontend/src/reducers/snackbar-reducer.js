import { OPEN_ERROR_SNACKBAR, CLOSE_ERROR_SNACKBAR } from "../actions/types";

const initialState = {
  snackbar: {
    error: {
      isOpen: false,
      message: "",
    },
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
    default:
      return state;
  }
}
