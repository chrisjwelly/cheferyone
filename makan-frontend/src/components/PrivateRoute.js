import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

export default function PrivateRoute({ children, ...rest }) {
  const currUser = useSelector((store) => store.auth.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isEmpty(currUser) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
