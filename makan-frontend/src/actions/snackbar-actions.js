import { OPEN_ERROR_SNACKBAR, CLOSE_ERROR_SNACKBAR } from "./types";

export const openErrorSnackBar = (message) => {
  return {
    type: OPEN_ERROR_SNACKBAR,
    payload: message,
  };
};

export const closeErrorSnackBar = () => {
  return {
    type: CLOSE_ERROR_SNACKBAR,
  };
};
