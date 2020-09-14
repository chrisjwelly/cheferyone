import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import CircularProgress from "@material-ui/core/CircularProgress";

import MenuCard from "../components/MenuCard";

import { setTabIndex } from "../actions/bottombar-actions";
import SuggestionsSectionContainer from "../components/SuggestionsSectionContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  progress: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
  signInContainer: {
    height: "100vh",
  },
  loginButton: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  buttonContainer: {
    width: theme.breakpoints.values.sm / 3,
  },
}));

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabIndex(0));
  }, [dispatch]);

  const currUser = useSelector((store) => store.auth.user);

  if (_.isEmpty(currUser)) {
    return <NotAuthenticated />;
  } else {
    return (
      <>
        <SuggestionsSectionContainer title="Recommended" seeMorePath="/">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </SuggestionsSectionContainer>
        <SuggestionsSectionContainer title="Recommended" seeMorePath="/">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </SuggestionsSectionContainer>
        <SuggestionsSectionContainer title="Recommended" seeMorePath="/">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </SuggestionsSectionContainer>
      </>
    );
  }
}

function Authenticated() {
  const classes = useStyles();
}

function NotAuthenticated() {
  const classes = useStyles();

  return (
    <Grid
      className={classes.signInContainer}
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item className={classes.buttonContainer}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          classes={{ root: classes.loginButton }}
          href="/login"
        >
          Login
        </Button>
      </Grid>
      <Grid item className={classes.buttonContainer}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          href="/register"
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
}
