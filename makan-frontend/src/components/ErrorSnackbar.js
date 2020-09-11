import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";

import { closeErrorSnackBar } from "../actions/snackbar-actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ErrorSnackbar() {
  const dispatch = useDispatch();
  const { isOpen, message } = useSelector((state) => state.snackbar.error);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeErrorSnackBar());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
}
