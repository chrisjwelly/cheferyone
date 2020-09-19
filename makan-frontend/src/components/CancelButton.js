import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { openDialog, closeDialog } from "../actions/dialog-actions";

export default function CancelButton({
  children,
  header,
  description,
  ...rest
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const cancel = () =>
    dispatch(
      openDialog(
        header,
        description,
        <>
          <Button color="primary" onClick={() => dispatch(closeDialog())}>
            No
          </Button>
          <Button
            color="primary"
            onClick={() => {
              dispatch(closeDialog());
              history.goBack();
            }}
          >
            Yes
          </Button>
        </>
      )
    );

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={cancel}
      {...rest}
    >
      {children}
    </Button>
  );
}
