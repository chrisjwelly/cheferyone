import {
  OPEN_ERROR_SNACKBAR,
  CLOSE_ERROR_SNACKBAR,
  CLOSE_ALL_SNACKBARS,
  OPEN_SUCCESS_SNACKBAR,
  OPEN_WARNING_SNACKBAR,
  CLOSE_WARNING_SNACKBAR,
  CLOSE_SUCCESS_SNACKBAR,
} from "./types";

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

export const openSuccessSnackBar = (message) => {
  return {
    type: OPEN_SUCCESS_SNACKBAR,
    payload: message,
  };
};

export const closeSuccessSnackBar = () => {
  return {
    type: CLOSE_SUCCESS_SNACKBAR,
  };
};

export const openWarningSnackBar = (message) => {
  return {
    type: OPEN_WARNING_SNACKBAR,
    payload: message,
  };
};

export const closeWarningSnackBar = () => {
  return {
    type: CLOSE_WARNING_SNACKBAR,
  };
};

export const closeAllSnackBars = () => {
  return {
    type: CLOSE_ALL_SNACKBARS,
  };
};
