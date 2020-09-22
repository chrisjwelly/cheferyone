import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  buttonContainer: {
    textAlign: "center",
  },
});

export default function SeeAllButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <Button component={Link} {...props} color="secondary">
        See All
      </Button>
    </div>
  );
}
