import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import RatingStars from "../components/RatingStars";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.breakpoints.values.sm / 4,
  },
  media: {
    height: 0,
    paddingTop: "75%", // 4:3
  },
  title: {
    fontWeight: "bold",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
}));

export default function MenuCard({ title, price, rating }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="/logo512.png"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="subtitle1" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {`S$${Number(price).toFixed(2)}`}
        </Typography>
        <RatingStars rating={rating} />
      </CardContent>
    </Card>
  );
}
