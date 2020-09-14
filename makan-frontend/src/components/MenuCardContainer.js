import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

const useStyles = makeStyles({
  gridList: {
    overflowX: "scroll",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  gridItem: {
    marginRight: "10px",
  },
  seeAllButton: {
    whiteSpace: "nowrap",
  },
});

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
          href={seeMorePath}
          color="primary"
        >
          See All
        </Button>
      </Grid>
    </Grid>
  );
}
