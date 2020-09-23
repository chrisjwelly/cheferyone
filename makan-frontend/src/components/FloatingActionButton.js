import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(3),
  },
}));

export default function FloatingActionButton({ children, ...rest }) {
  const classes = useStyles();

  return (
    <Fab {...rest} className={clsx(classes.fab, rest.className)}>
      {children}
    </Fab>
  );
}
