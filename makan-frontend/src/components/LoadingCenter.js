import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    left: "calc(50% - 20px)",
    top: "calc(50% - 20px)",
  },
});
export default function LoadingCenter(props) {
  const classes = useStyles();
  
  return <CircularProgress className={classes.root} />;
}
