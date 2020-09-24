import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import isEmpty from "lodash/isEmpty";
import { Link as LinkRouter } from "react-router-dom";
import ReactGA from "react-ga";

import LoadingButton from "../components/LoadingButton";
import { loginUser } from "../actions/auth-actions";
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

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // Redirect if logged in
  const currUser = useSelector((store) => store.auth.user);
  useEffect(() => {
    if (!isEmpty(currUser)) {
      history.push("/");
    }
  });

  const [inputs, setInputs] = useState({
    login: "",
    password: "",
    isRemember: false,
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
      category: "Logging in",
      action: "User is logging in",
    });
    e.preventDefault();
    dispatch(
      loginUser(
        () =>
          post(
            {
              user: {
                login: inputs.login,
                password: inputs.password,
              },
            },
            "/api/v1/users/sign_in",
            "POST",
            null,
            false,
            true
          ),
        inputs.isRemember,
        () => setIsLoading(false),
        history
      )
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="login"
                label="Email or Username"
                name="login"
                error={errors.login !== undefined}
                onChange={onChange}
                value={inputs.login}
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
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            onChange={() =>
              setInputs({ ...inputs, isRemember: !inputs.isRemember })
            }
            label="Remember me"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            isLoading={isLoading}
          >
            Log In
          </LoadingButton>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={LinkRouter} to="/register" variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
