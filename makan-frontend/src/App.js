import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import axios from "axios";

import Home from "./pages/Home";
import ListMenu from "./pages/ListMenu";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import YourRestaurant from "./pages/YourRestaurant";
import EditMenu from "./pages/EditMenu";
import Notifications from "./pages/Notifications";
import CreateMenu from "./pages/CreateMenu";
import SearchPage from "./pages/SearchPage";

import BottomNavigationBar from "./components/BottomNavigationBar";
import ErrorSnackbar from "./components/ErrorSnackbar";
import LoadingCenter from "./components/LoadingCenter";
import PrivateRoute from "./components/PrivateRoute";
import RootDialog from "./components/RootDialog";
import SuccessSnackbar from "./components/SuccessSnackbar";
import TopAppBar from "./components/TopAppBar";
import setAuthHeaders from "./utils/set-auth-headers";
import { setCurrentUser, logoutUser } from "./actions/auth-actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
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
          try {
            await axios.get("/api/v1/authenticated");
          } catch (err) {
            if (err.response && err.response.status === 401) {
              // Is online and unauthorized
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
  const isSearchActive = useSelector((store) => store.search.isActive);

  return (
    <>
      <ErrorSnackbar />
      <SuccessSnackbar />
      <RootDialog />
      <TopAppBar hasBell={!_.isEmpty(currUser)} />
      <Container className={classes.root} maxWidth="sm">
        <Switch>
          <PrivateRoute exact path="/your-restaurant">
            <YourRestaurant />
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
          <PrivateRoute exact path="/menu/:id/edit">
            <EditMenu />
          </PrivateRoute>
          <PrivateRoute exact path="/new">
            <ListMenu section="new" />
          </PrivateRoute>
          <PrivateRoute exact path="/notifications">
            <Notifications />
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
        {isSearchActive ? (
          <SearchPage />
        ) : (
          <Switch>
            <PrivateRoute exact path="/your-restaurant">
              <YourRestaurant currTab={0} />
            </PrivateRoute>
            <PrivateRoute exact path="/your-restaurant/orders">
              <YourRestaurant currTab={1} />
            </PrivateRoute>
            <PrivateRoute exact path="/your-restaurant/edit">
              <YourRestaurant currTab={2} />
            </PrivateRoute>
            <PrivateRoute exact path="/your-restaurant/create">
              <CreateMenu />
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
            <PrivateRoute exact path="/menu/:id/edit">
              <EditMenu />
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
        )}
      </Container>
      {!_.isEmpty(currUser) && (
        <BottomNavigationBar className={classes.bottomNavigationBar} />
      )}
    </>
  );
}

export default App;
