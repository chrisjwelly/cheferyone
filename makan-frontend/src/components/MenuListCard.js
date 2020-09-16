import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import clsx from "clsx";

import RatingStars from "../components/RatingStars";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.breakpoints.values.sm / 4,
    textDecoration: "none",
  },
  card: {
    padding: theme.spacing(2),
  },
  cardContent: {
    "&:last-child": { paddingBottom: "0px" },
  },
  media: {
    objectFit: "cover",
    height: theme.breakpoints.values.sm / 5,
    width: theme.breakpoints.values.sm / 5,
    boxShadow: theme.shadows[1],
  },
  detailsContainer: { overflow: "hidden" },
  title: {
    fontWeight: "bold",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
}));

export default function MenuListCard({
  name,
  homecook,
  price,
  rating,
  link,
  image,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Link to={link} className={classes.root}>
      <Card {...rest} className={clsx(classes.card, rest.className)}>
        <Grid container wrap="nowrap">
          <Grid item>
            <CardMedia className={classes.media} image={image} title={name} />
          </Grid>
          <Grid item className={classes.detailsContainer}>
            <CardContent className={classes.cardContent}>
              <Typography variant="subtitle1" className={classes.title}>
                {name}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {`S$${price}`}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {homecook}
              </Typography>
              <RatingStars size="small" rating={rating} />
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
}
