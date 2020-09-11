import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, Link } from "react-router-dom";

import { useGet } from "./utils/rest-utils";

import BottomNavigationBar from "./components/BottomNavigationBar";
import TopAppBar from "./components/TopAppBar";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

const useStyles = makeStyles({
  root: {
    marginBottom: "60px",
  },
});

function App() {
  const classes = useStyles();
  // const { data, isLoading, error } = useGet("/api/test/index");

  return (
    <>
      <CssBaseline />
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
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            {() => <p>Oh the sadness... This page does not exist.</p>}
          </Route>
        </Switch>
      </Container>
      <BottomNavigationBar />
    </>
  );
}

export default App;
