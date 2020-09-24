import setAuthHeaders from "../utils/set-auth-headers";
import { SET_CURRENT_USER } from "./types";
import { openSuccessSnackBar } from "./snackbar-actions";

// Login - get user token
export const loginUser = (post, isRemember, setLoadingDone, history) => (
  dispatch
) => {
  post().then((res) => {
    if (res) {
      const user = {
        email: res.data.email,
        authentication_token: res.data.authentication_token,
      };
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
    } else {
      setLoadingDone();
    }
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
  window.location.reload();
};
