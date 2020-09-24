import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { Link as LinkRouter } from "react-router-dom";
import ReactGA from "react-ga";

import LoadingButton from "../components/LoadingButton";
import {
  closeErrorSnackBar,
  openSuccessSnackBar,
} from "../actions/snackbar-actions";
import { usePost } from "../utils/rest-utils";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // Redirect if logged in
  const currUser = useSelector((store) => store.auth.user);
  useEffect(() => {
    if (!isEmpty(currUser)) {
      history.push("/");
    }
  }, [currUser, history]);

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { errors, post, resetErrors } = usePost();

  const onChange = (e) => {
    resetErrors();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    ReactGA.event({
      category: "Registering an account",
      action: "User is registering an account",
    });
    e.preventDefault();
    setIsLoading(true);
    post(
      {
        user: inputs,
      },
      "/api/v1/users",
      "POST",
      null,
      false
    ).then((res) => {
      if (res) {
        dispatch(closeErrorSnackBar());
        dispatch(openSuccessSnackBar("Registration successful!"));
        history.push("/login"); // re-direct to login on successful register
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                error={errors.email !== undefined}
                autoComplete="email"
                onChange={onChange}
                value={inputs.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                error={errors.username !== undefined}
                autoComplete="username"
                onChange={onChange}
                value={inputs.username}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                error={errors.password !== undefined}
                label="Password"
                type="password"
                id="password"
                onChange={onChange}
                value={inputs.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                error={errors.password_confirmation !== undefined}
                label="Confirm Password"
                type="password"
                id="password_confirmation"
                onChange={onChange}
                value={inputs.password_confirmation}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            isLoading={isLoading}
          >
            Register
          </LoadingButton>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={LinkRouter} to="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
