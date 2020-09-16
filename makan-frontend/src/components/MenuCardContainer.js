import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  gridList: {
    overflowX: "scroll",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  gridItem: {
    marginRight: theme.spacing(1),
  },
  seeAllButton: {
    whiteSpace: "nowrap",
  },
}));

export default function MenuCardContainer({ children, seeMorePath, ...rest }) {
  const classes = useStyles();
  return (
    <Grid
      {...rest}
      container
      wrap="nowrap"
      className={clsx(classes.gridList, rest.className)}
      alignItems="center"
    >
      {children.map((child, i) => (
        <Grid className={classes.gridItem} key={i}>
          {child}
        </Grid>
      ))}
      <Grid className={classes.gridItem} item>
        <Button
          className={classes.seeAllButton}
          component={Link}
          to={seeMorePath}
          color="primary"
        >
          See All
        </Button>
      </Grid>
    </Grid>
  );
}
