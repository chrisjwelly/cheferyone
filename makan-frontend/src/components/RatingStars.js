import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

export default function RatingStars({ rating, size, count }) {
  const nearestHalf = Math.round(Number(rating) * 2) / 2;

  return (
    <Grid container wrap="nowrap" alignItems="center">
      <Grid item>
        <Typography variant="caption" color="textSecondary">
          {Number(rating).toFixed(1)}
        </Typography>
      </Grid>
      <Grid item>
        <Rating
          name="read-only"
          value={nearestHalf}
          precision={0.5}
          readOnly
          size={size}
        />
      </Grid>
      {count !== undefined && (
        <Grid item>
          <Typography variant="caption" color="textSecondary">
            {`(${count})`}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
