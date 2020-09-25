import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";

import RatingStars from "../components/RatingStars";
import { stringToMoney } from "../utils/general";

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: "none",
  },
  card: {
    maxWidth: theme.breakpoints.values.sm / 4,
  },
  media: {
    height: theme.spacing(14),
    objectFit: "cover",
  },
  title: {
    fontWeight: "bold",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  tagsContainer: {
    height: theme.spacing(5),
  },
}));

export default function MenuCard({
  name,
  price,
  rating,
  count,
  link,
  image,
  tags,
}) {
  const classes = useStyles();
  return (
    <Link to={link} className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          component="img"
          crossOrigin="anonymous"
          image={!image ? "/insert_photo-24px.svg" : image}
          title={name}
        />
        <CardContent>
          <Typography variant="subtitle1" className={classes.title}>
            {name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {`S$${stringToMoney(price)}`}
          </Typography>
          <Grid
            container
            wrap="nowrap"
            alignItems="center"
            spacing={1}
            className={classes.tagsContainer}
          >
            {tags.map((t, i) => (
              <Grid key={i} item>
                <Chip size="small" label={t.name + " "} />
              </Grid>
            ))}
          </Grid>
          <RatingStars size="small" rating={rating} count={count} />
        </CardContent>
      </Card>
    </Link>
  );
}
