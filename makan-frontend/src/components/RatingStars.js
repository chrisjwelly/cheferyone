import React from "react";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const MAX_RATING = 5;

const useStyles = makeStyles({
  star: {
    color: "#f9b403",
  },
  ratingText: {
    marginLeft: "5px",
  },
});

export default function RatingStars({ rating }) {
  const classes = useStyles();

  const nearestHalf = Math.round(Number(rating) * 2) / 2;

  const numberOfFullStars = Math.floor(nearestHalf);
  const numberOfHalfStars = (nearestHalf - numberOfFullStars) * 2;
  const numberOfEmptyStars = MAX_RATING - numberOfFullStars - numberOfHalfStars;

  return (
    <Grid container wrap="nowrap" alignItems="center">
      {[
        ..._.range(numberOfFullStars).map((index) => (
          <Grid key={index} item>
            <StarIcon fontSize="small" className={classes.star} />
          </Grid>
        )),
        ..._.range(numberOfHalfStars).map((index) => (
          <Grid item key={index + numberOfFullStars}>
            <StarHalfIcon fontSize="small" className={classes.star} />
          </Grid>
        )),
        ..._.range(numberOfEmptyStars).map((index) => (
          <Grid item key={index + numberOfFullStars + numberOfHalfStars}>
            <StarBorderIcon fontSize="small" className={classes.star} />
          </Grid>
        )),
      ]}
      <Grid item>
        <Typography
          variant="caption"
          color="textSecondary"
          className={classes.ratingText}
        >
          {rating}
        </Typography>
      </Grid>
    </Grid>
  );
}
