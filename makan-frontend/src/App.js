import React, { useState, useEffect, Suspense, lazy } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import axios from "axios";
import ReactGA from "react-ga";

import BottomNavigationBar from "./components/BottomNavigationBar";
import ErrorSnackbar from "./components/ErrorSnackbar";
import WarningSnackbar from "./components/WarningSnackbar";
import LoadingCenter from "./components/LoadingCenter";
import PrivateRoute from "./components/PrivateRoute";
import RootDialog from "./components/RootDialog";
import SuccessSnackbar from "./components/SuccessSnackbar";
import TopAppBar from "./components/TopAppBar";
import SearchOverlay from "./components/SearchOverlay";
import NotificationsDrawer from "./components/NotificationsDrawer";
import LoginPrompt from "./components/LoginPrompt";

import setAuthHeaders from "./utils/set-auth-headers";
import { setCurrentUser, logoutUser } from "./actions/auth-actions";
import { getLocation } from "./actions/location-actions";
import { runRequests } from "./utils/offline-utils";

const Home = lazy(() => import("./pages/Home"));
const ListMenu = lazy(() => import("./pages/ListMenu"));
const Login = lazy(() => import("./pages/Login"));
const Menu = lazy(() => import("./pages/Menu"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Orders = lazy(() => import("./pages/Orders"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const YourRestaurant = lazy(() => import("./pages/YourRestaurant"));
const EditMenu = lazy(() => import("./pages/EditMenu"));
const Chef = lazy(() => import("./pages/Chef"));
const CreateMenu = lazy(() => import("./pages/CreateMenu"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const RestaurantOrderSection = lazy(() =>
  import("./pages/RestaurantOrderSection")
);
const SubmitReview = lazy(() => import("./pages/SubmitReview"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));

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
    ReactGA.initialize("UA-178745693-1");

    async function hydrateRedux() {
      if (isEmpty(currUser)) {
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
            ReactGA.set({
              email: userObj.email,
            });
          } catch (err) {
            if (err.response && err.response.status === 401) {
              // Is online and unauthorized
              dispatch(logoutUser());
            }
          }
        }
      }

      setIsLoading(false);
      dispatch(getLocation());
    }

    hydrateRedux();
  }, [currUser, dispatch]);

  useEffect(() => {
    window.addEventListener("online", runRequests);

    return () => window.removeEventListener("online", runRequests);
  }, []);

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
  const isShowSearchOverlay = useSelector(
    (store) => store.search.isShowSearchOverlay
  );

  return (
    <>
      <ErrorSnackbar />
      <SuccessSnackbar />
      <WarningSnackbar />
      <RootDialog />
      <NotificationsDrawer />
      <TopAppBar hasBell={!isEmpty(currUser)} />
      {isEmpty(currUser) && <LoginPrompt />}
      {isShowSearchOverlay ? (
        <SearchOverlay />
      ) : (
        <Container className={classes.root} maxWidth="sm">
          <Suspense fallback={null}>
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
              <PrivateRoute exact path="/your-restaurant/orders/:id">
                <RestaurantOrderSection />
              </PrivateRoute>
              <PrivateRoute exact path="/orders">
                <Orders isPaid={false} />
              </PrivateRoute>
              <PrivateRoute exact path="/orders/paid">
                <Orders isPaid={true} />
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <Profile />
              </PrivateRoute>
              <PrivateRoute exact path="/recommended">
                <ListMenu section="recommended" />
              </PrivateRoute>
              <PrivateRoute exact path="/menu/:id/edit">
                <EditMenu />
              </PrivateRoute>
              <PrivateRoute exact path="/menu/:id/review">
                <SubmitReview />
              </PrivateRoute>
              <PrivateRoute exact path="/checkout">
                <Checkout />
              </PrivateRoute>
              <Route exact path="/nearby">
                <ListMenu section="nearby" />
              </Route>
              <Route exact path="/new">
                <ListMenu section="new" />
              </Route>
              <Route exact path="/search/:section/:term">
                <SearchPage />
              </Route>
              <Route exact path="/filter/:section/:term">
                <SearchPage isFilter />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/menu/:id">
                <Menu />
              </Route>
              <Route exact path="/chef/:username">
                <Chef />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </Container>
      )}

      {!isEmpty(currUser) && (
        <BottomNavigationBar className={classes.bottomNavigationBar} />
      )}
    </>
  );
}

export default App;
