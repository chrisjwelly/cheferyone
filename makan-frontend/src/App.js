import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import { useGet } from "./utils/rest-utils";

import BottomNavigationBar from "./components/BottomNavigationBar";
import TopAppBar from "./components/TopAppBar";

const useStyles = makeStyles({
  root: {
    marginBottom: "60px",
  },
});

function App() {
  const classes = useStyles();
  const { data, isLoading, error } = useGet("/api/test/index");

  return (
    <>
      <CssBaseline />
      <TopAppBar />
      <Container className={classes.root} maxWidth="sm">
        <h1>Hello Home Cooks!</h1>
        <p>Example loading from rails backend</p>
        {isLoading || error ? <p>Loading...</p> : <p>{data.content}</p>}
      </Container>
      <BottomNavigationBar />
    </>
  );
}

export default App;
