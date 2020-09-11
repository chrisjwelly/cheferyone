import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route } from "react-router-dom";

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

const useStyles = makeStyles({
  root: {
    marginBottom: "60px",
  },
  bottomNavigationBar: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

function App() {
  const classes = useStyles();
  // const { data, isLoading, error } = useGet("/api/test/index");

  return (
    <>
      <CssBaseline />
      <ErrorSnackbar />
      <SuccessSnackbar />
      {/* Add check to display top and bottom bar depending on auth status */}
      <TopAppBar />
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
      <BottomNavigationBar className={classes.bottomNavigationBar} />
    </>
  );
}

export default App;
