import React from "react";
import { Redirect } from "react-router-dom";

import LoadingCenter from "../components/LoadingCenter";
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
  skipNotFound,
  skipUnauthorized,
}) {
  if (isLoading) {
    return <LoadingCenter />;
  } else if (isUnauthorized && !skipUnauthorized) {
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
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  } else if (isNotFound && !skipNotFound) {
    // 404
    return <NotFound />;
  } else if (error && !navigator.onLine) {
    // placeholder
    // Improve when we have more advanced offline features
    // No internet access
    return <Offline />;
  } else if (
    error &&
    !isForbidden &&
    !isLoading &&
    !isUnauthorized &&
    !isNotFound
  ) {
    // Other unspecified errors
    return <Error />;
  } else {
    return children(data);
  }
}
