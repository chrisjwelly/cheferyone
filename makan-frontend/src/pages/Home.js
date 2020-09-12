import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import _ from "lodash";

import { setTabIndex } from "../actions/bottombar-actions";

const useStyles = makeStyles((theme) => ({
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
    return <h1>Suggestions</h1>;
  }
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
