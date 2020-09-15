import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import axios from "axios";

import BottomNavigationBar from "./components/BottomNavigationBar";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Restaurant from "./pages/Restaurant";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import ListMenu from "./pages/ListMenu";
import NotFound from "./pages/NotFound";
import TopAppBar from "./components/TopAppBar";
import ErrorSnackbar from "./components/ErrorSnackbar";
import SuccessSnackbar from "./components/SuccessSnackbar";
import { setCurrentUser, logoutUser } from "./actions/auth-actions";
import setAuthHeaders from "./utils/set-auth-headers";
import PrivateRoute from "./components/PrivateRoute";
import LoadingCenter from "./components/LoadingCenter";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(9),
  },
  bottomNavigationBar: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
}));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const currUser = useSelector((store) => store.auth.user);
  useEffect(() => {
    async function hydrateRedux() {
      if (_.isEmpty(currUser)) {
        const user =
          localStorage.getItem("auth") || sessionStorage.getItem("auth");
        if (user) {
          // Hydrate redux store if already logged in
          console.log("Logging in from storage...");
          const userObj = JSON.parse(user);
          setAuthHeaders(userObj);
          dispatch(setCurrentUser(userObj));
          if (navigator.onLine) {
            try {
              await axios.get("/api/v1/authenticated");
            } catch {
              // Logout if not authenticated anymore
              dispatch(logoutUser());
            }
          }
        }
      }

      setIsLoading(false);
    }

    hydrateRedux();
  }, [currUser, dispatch]);

  return (
    <>
      <CssBaseline />
      {isLoading ? <LoadingCenter /> : <Main />}
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
      <TopAppBar hasBell={!_.isEmpty(currUser)} />
      <Container className={classes.root} maxWidth="sm">
        <Switch>
          <PrivateRoute path="/your-restaurant">
            <Restaurant />
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Orders />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute exact path="/recommended">
            <ListMenu section="recommended" />
          </PrivateRoute>
          <PrivateRoute exact path="/nearby">
            <ListMenu section="nearby" />
          </PrivateRoute>
          <PrivateRoute exact path="/new">
            <ListMenu section="new" />
          </PrivateRoute>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/menu/:id">
            <Menu />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
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
