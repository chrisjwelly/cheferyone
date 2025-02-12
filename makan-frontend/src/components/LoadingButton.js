import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function LoadingButton({ isLoading, children, ...rest }) {
  return (
    <Button {...rest} disabled={isLoading ? true : undefined}>
      {isLoading ? <CircularProgress /> : children}
    </Button>
  );
}
