import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";

import { closeWarningSnackBar } from "../actions/snackbar-actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function WarningSnackbar() {
  const dispatch = useDispatch();
  const { isOpen, message } = useSelector((state) => state.snackbar.warning);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeWarningSnackBar());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="warning">
        {message}
      </Alert>
    </Snackbar>
  );
}
