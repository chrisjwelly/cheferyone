import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LinesEllipsis from "react-lines-ellipsis";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "react-redux";

import RatingStars from "./RatingStars";
import SubscribeButton from "./SubscribeButton";

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
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
}));

export default function MenuHeader({
  name,
  rating,
  homecook,
  image,
  id,
  isOwner,
}) {
  const classes = useStyles();

  const currUser = useSelector((store) => store.auth.user);

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
        {!isOwner && !isEmpty(currUser) && (
          <SubscribeButton
            className={classes.marginBottom}
            size="small"
            menuId={id}
          />
        )}
        <RatingStars size="small" rating={rating} />
        <Typography
          variant="caption"
          component={RouterLink}
          to={`/chef/${homecook}`}
          className={classes.linkStyle}
        >{`Home Chef: ${homecook}`}</Typography>
      </Grid>
    </Grid>
  );
}
