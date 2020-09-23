import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LinesEllipsis from "react-lines-ellipsis";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

import RatingStars from "./RatingStars";

const useStyles = makeStyles((theme) => ({
  thumbnail: {
    objectFit: "cover",
    height: theme.breakpoints.values.sm / 5,
    width: theme.breakpoints.values.sm / 5,
    boxShadow: theme.shadows[1],
    marginRight: theme.spacing(1),
  },
  nameContainer: {
    overflow: "hidden",
  },
  linkStyle: {
    textDecoration: "none",
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function MenuHeader({ name, rating, homecook, image }) {
  const classes = useStyles();

  return (
    <Grid container wrap="nowrap" alignItems="center">
      {image && (
        <Grid item component={Link} href={image}>
          <img alt={name} className={classes.thumbnail} src={image} />
        </Grid>
      )}
      <Grid item className={classes.nameContainer}>
        <Typography variant="h6" component="div">
          <LinesEllipsis text={name} maxLine="2" basedOn="letters" />
        </Typography>
        <RatingStars size="small" rating={rating} />
        <Typography
          variant="caption"
          component={RouterLink}
          to={`/chef/${homecook}`}
          className={classes.linkStyle}
        >{`Homecook: ${homecook}`}</Typography>
      </Grid>
    </Grid>
  );
}
