import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LinesEllipsis from "react-lines-ellipsis";

import RatingStars from "./RatingStars";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
  },
  thumbnail: {
    objectFit: "cover",
    height: theme.breakpoints.values.sm / 5,
    width: theme.breakpoints.values.sm / 5,
    boxShadow: theme.shadows[1],
  },
  nameContainer: {
    marginLeft: theme.spacing(1),
    overflow: "hidden",
  },
}));

export default function MenuHeader({ name, rating, homecook, image }) {
  const classes = useStyles();

  return (
    <Grid container wrap="nowrap" alignItems="center" className={classes.root}>
      <Grid item>
        <img alt={name} className={classes.thumbnail} src={image} />
      </Grid>
      <Grid item className={classes.nameContainer}>
        <Typography variant="h6" component="div">
          <LinesEllipsis text={name} maxLine="2" basedOn="letters" />
        </Typography>
        <RatingStars size="small" rating={rating} />
        <Typography variant="caption">{`Homecook: ${homecook}`}</Typography>
      </Grid>
    </Grid>
  );
}
