import axios from "axios";

export default function setAuthHeaders(user) {
  if (user && user.email && user.authentication_token) {
    // Apply authorization token and email to every request if logged in
    axios.defaults.headers.common["X-User-Email"] = user.email;
    axios.defaults.headers.common["X-User-Token"] = user.authentication_token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["X-User-Email"];
    delete axios.defaults.headers.common["X-User-Token"];
  }
}
