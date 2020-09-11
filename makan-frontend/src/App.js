import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

// import { useGet } from "./utils/rest-utils";

import BottomNavigationBar from "./components/BottomNavigationBar";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import TopAppBar from "./components/TopAppBar";
import ErrorSnackbar from "./components/ErrorSnackbar";
import SuccessSnackbar from "./components/SuccessSnackbar";
import { setCurrentUser, logoutUser } from "./actions/auth-actions";
import setAuthHeaders from "./utils/set-auth-headers";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    marginBottom: "60px",
  },
  bottomNavigationBar: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  progress: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
});

function App() {
  const classes = useStyles();
  // const { data, isLoading, error } = useGet("/api/test/index");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const currUser = useSelector((store) => store.auth.user);
  useEffect(() => {
    if (_.isEmpty(currUser)) {
      // Hydrate redux store if already logged in
      const user =
        localStorage.getItem("auth") || sessionStorage.getItem("auth");
      if (user) {
        console.log("Getting auth status");
        const userObj = JSON.parse(user);
        setAuthHeaders(userObj);
        dispatch(setCurrentUser(userObj));
        if (navigator.onLine) {
          axios
            .get("/api/authenticated")
            .catch(() => {
              // Logout if not authenticated anymore
              dispatch(logoutUser());
            })
            .finally(() => setIsLoading(false));
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [currUser, dispatch]);

  return (
    <>
      <CssBaseline />
      {isLoading ? <CircularProgress className={classes.progress} /> : <Main />}
    </>
  );
}

function Main() {
  const classes = useStyles();
  const currUser = useSelector((store) => store.auth.user);

  return (
    <>
      <ErrorSnackbar />
      <SuccessSnackbar />
      {!_.isEmpty(currUser) && <TopAppBar />}
      <Container className={classes.root} maxWidth="sm">
        <Switch>
          <Route path="/your-restaurant">
            <Restaurant />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            {() => <p>Oh the sadness... This page does not exist.</p>}
          </Route>
        </Switch>
      </Container>
      {!_.isEmpty(currUser) && (
        <BottomNavigationBar className={classes.bottomNavigationBar} />
      )}
    </>
  );
}

export default App;
