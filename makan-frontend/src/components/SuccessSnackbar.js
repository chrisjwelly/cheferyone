import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";

import { closeSuccessSnackBar } from "../actions/snackbar-actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SuccessSnackbar() {
  const dispatch = useDispatch();
  const { isOpen, message } = useSelector((state) => state.snackbar.success);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeSuccessSnackBar());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
}
