import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { setTabIndex } from "../actions/bottombar-actions";
import { useGet, usePost } from "../utils/rest-utils";
import LoadingButton from "../components/LoadingButton";
import { logoutUser } from "../actions/auth-actions";
import GreenButton from "../components/GreenButton";
import RedButton from "../components/RedButton";
import { openDialog, closeDialog } from "../actions/dialog-actions";
import { openSuccessSnackBar } from "../actions/snackbar-actions";

const useStyles = makeStyles((theme) => ({
  marginBottom: { marginBottom: theme.spacing(4) },
}));

export default function Profile() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabIndex(3));
  }, [dispatch]);

  const { data, isLoading } = useGet("/api/v1/user");
  const { post, errors, resetErrors } = usePost();

  const [username, setUsername] = useState("");
  const [passwords, setPasswords] = useState({
    password: "",
    password_confirmation: "",
  });
  const [isChangeUsernameLoading, setIsChangeUsernameLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setUsername(data.username);
    }
  }, [isLoading, data]);

  const changeUsername = async (e) => {
    setIsChangeUsernameLoading(true);

    e.preventDefault();
    const res = await post(
      {
        user: {
          username,
        },
      },

      "/api/v1/users",
      "PATCH"
    );
    if (res && res !== "offline") {
      dispatch(openSuccessSnackBar("Username successfully changed!"));
    }
    setIsChangeUsernameLoading(false);
  };

  const changePassword = async (e) => {
    e.preventDefault();

    const res = await post(
      {
        user: {
          password: passwords.password,
          password_confirmation: passwords.password_confirmation,
        },
      },

      "/api/v1/users",
      "PATCH",
      null,
      null,
      true
    );
    if (res && res !== "offline") {
      dispatch(openSuccessSnackBar("Password successfully changed!"));
    }
  };

  const logout = () => {
    dispatch(logoutUser());
    history.push("/");
  };

  const deleteAccount = async (e) => {
    e.preventDefault();
    dispatch(
      openDialog(
        "Delete account?",
        "This action is irreversible!",
        <>
          <Button color="primary" onClick={() => dispatch(closeDialog())}>
            No
          </Button>
          <Button
            color="primary"
            onClick={async () => {
              dispatch(closeDialog());
              const res = await post(
                {},

                "/api/v1/users",
                "DELETE",
                null,
                null,
                true
              );
              if (res && res !== "offline") {
                dispatch(openSuccessSnackBar("Account successfully deleted!"));
                history.push("/");
              }
            }}
          >
            Yes
          </Button>
        </>
      )
    );
  };

  return (
    <div>
      <Typography className={classes.marginBottom} variant="h6">
        Profile
      </Typography>
      <Grid container className={classes.marginBottom} spacing={2}>
        <Grid item xs={6}>
          <GreenButton onClick={logout} fullWidth>
            Logout
          </GreenButton>
        </Grid>
        <Grid item xs={6}>
          <RedButton onClick={deleteAccount} fullWidth>
            Delete Account
          </RedButton>
        </Grid>
      </Grid>
      <form
        noValidate
        onSubmit={changeUsername}
        className={classes.marginBottom}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Change username"
              value={username}
              onChange={(e) => {
                resetErrors();
                setUsername(e.target.value);
              }}
              error={errors.username !== undefined}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              isLoading={isChangeUsernameLoading}
            >
              Change username
            </LoadingButton>
          </Grid>
        </Grid>
      </form>

      <form noValidate onSubmit={changePassword}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Change password"
              value={passwords.password}
              onChange={(e) => {
                resetErrors();
                setPasswords({
                  ...passwords,
                  password: e.target.value,
                });
              }}
              error={errors.password !== undefined}
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="New password confirmation"
              value={passwords.password_confirmation}
              onChange={(e) => {
                resetErrors();
                setPasswords({
                  ...passwords,
                  password_confirmation: e.target.value,
                });
              }}
              error={errors.password_confirmation}
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              isLoading={isChangeUsernameLoading}
            >
              Change password
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
