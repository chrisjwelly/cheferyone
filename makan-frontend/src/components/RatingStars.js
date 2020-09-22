import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  star: {
    color: "#f9b403",
  },
  ratingText: {
    marginLeft: theme.spacing(1),
  },
}));

export default function RatingStars({ rating, size }) {
  const classes = useStyles();

  const nearestHalf = Math.round(Number(rating) * 2) / 2;

  return (
    <Grid container wrap="nowrap" alignItems="center">
      <Rating
        name="read-only"
        value={nearestHalf}
        precision={0.5}
        readOnly
        size={size}
      />
      <Grid item>
        <Typography
          variant="caption"
          color="textSecondary"
          className={classes.ratingText}
        >
          {Number(rating).toFixed(1)}
        </Typography>
      </Grid>
    </Grid>
  );
}
