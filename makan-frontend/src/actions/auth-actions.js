import axios from "axios";
import setAuthHeaders from "../utils/set-auth-headers";
import { SET_CURRENT_USER } from "./types";
import {
  openErrorSnackBar,
  openSuccessSnackBar,
  closeErrorSnackBar,
} from "./snackbar-actions";

// Login - get user token
export const loginUser = (
  login,
  password,
  isRemember,
  setLoadingDone,
  history
) => (dispatch) => {
  axios
    .post(
      "/api/v1/users/sign_in",
      JSON.stringify({
        user: { login, password },
      })
    )
    .then((res) => {
      dispatch(closeErrorSnackBar());
      const { user } = res.data.data;
      // Set token to Auth header
      setAuthHeaders(user);
      dispatch(setCurrentUser(user));
      if (isRemember) {
        localStorage.setItem("auth", JSON.stringify(user));
      } else {
        sessionStorage.setItem("auth", JSON.stringify(user));
      }
      dispatch(openSuccessSnackBar("Login successful!"));
      history.push("/");
    })
    .catch((err) => {
      dispatch(openErrorSnackBar("Log In Failed"));
      setLoadingDone();
    });
};

// Set logged in user
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("auth");
  sessionStorage.removeItem("auth");
  // Remove auth header for future requests
  setAuthHeaders(false);
  // Set current user to empty object {}
  dispatch(setCurrentUser({}));
};
