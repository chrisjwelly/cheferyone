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
import _ from "lodash";
import { Link as LinkRouter } from "react-router-dom";

import LoadingButton from "../components/LoadingButton";
import { loginUser } from "../actions/auth-actions";

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
    if (!_.isEmpty(currUser)) {
      history.push("/");
    }
  });

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    isRemember: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUser(
        inputs.email,
        inputs.password,
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
                id="email"
                label="Email Address"
                name="email"
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
                name="password"
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
          <Grid container>
            <Grid item xs>
              <Link component={LinkRouter} to="/" variant="body2">
                Forgot Password?
              </Link>
            </Grid>
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
