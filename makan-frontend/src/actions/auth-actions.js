import axios from "axios";
import setAuthHeaders from "../utils/set-auth-headers";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Login - get user token
export const loginUser = (email, password) => (dispatch) => {
  axios
    .post(
      "/api/users/sign_in",
      JSON.stringify({
        user: { email, password },
      })
    )
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { user } = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      // Set token to Auth header
      setAuthHeaders(user);
      // Set current user
      dispatch(setCurrentUser(user));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
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
  localStorage.removeItem("user");
  // Remove auth header for future requests
  setAuthHeaders(false);
  // Set current user to empty object {}
  dispatch(setCurrentUser({}));
};
