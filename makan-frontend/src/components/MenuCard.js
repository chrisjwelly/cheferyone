import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import RatingStars from "../components/RatingStars";

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: "none",
  },
  card: {
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

export default function MenuCard({ name, price, rating, link, image, tags }) {
  const classes = useStyles();
  return (
    <Link to={link} className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={!image ? "/insert_photo-24px.svg" : image}
          title={name}
        />
        <CardContent>
          <Typography variant="subtitle1" className={classes.title}>
            {name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {`S$${price}`}
          </Typography>
          <Typography variant="subtitle2" className={classes.title} component="div">
            {tags.map(t => t.name + " ")}
          </Typography>
          <RatingStars size="small" rating={rating} />
        </CardContent>
      </Card>
    </Link>
  );
}
