import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoadingCenter from "../components/LoadingCenter";
import { logoutUser } from "../actions/auth-actions";
import Offline from "../pages/Offline";
import NotFound from "../pages/NotFound";
import Error from "../pages/Error";

// Wrap children in a HOC
export default function RenderResponse({
  data,
  isLoading,
  error,
  isUnauthorized,
  isForbidden,
  isNotFound,
  children,
}) {
  const dispatch = useDispatch();
  if (isLoading) {
    return <LoadingCenter />;
  } else if (isUnauthorized) {
    // Not logged in
    // Implement history for redirects next time
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  } else if (isForbidden) {
    // No permission
    dispatch(logoutUser());
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  } else if (isNotFound) {
    // 404
    return <NotFound />;
  } else if (error && !navigator.onLine) {
    // No internet access
    return <Offline />;
  } else if (error) {
    // Other unspecified errors
    return <Error />;
  } else {
    return children(data);
  }
}
