import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { openSuccessSnackBar } from "../actions/snackbar-actions";

import { setTabIndex } from "../actions/bottombar-actions";
import { useGet, usePost } from "../utils/rest-utils";
import LoadingButton from "../components/LoadingButton";

const useStyles = makeStyles((theme) => ({
  header: { marginBottom: theme.spacing(4) },
}));

export default function Profile() {
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
  }, [data]);

  const changeUsername = async (e) => {
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
  };

  return (
    <div>
      <Typography className={classes.header} variant="h6">
        Profile
      </Typography>
      <form noValidate onSubmit={changeUsername}>
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
      <form noValidate onSubmit={changeUsername}>
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
    </div>
  );
}
