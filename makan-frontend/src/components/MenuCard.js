import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import RatingStars from "../components/RatingStars";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.breakpoints.values.sm / 3,
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

export default function MenuCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="/logo512.png"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          The Soup Spoon
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Price
        </Typography>
        <RatingStars rating={3.8} />
      </CardContent>
    </Card>
  );
}
