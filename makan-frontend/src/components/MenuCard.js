import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
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
  price: {
    textAlign: "right",
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
          Chicken Rice Power nasi
        </Typography>
        <Typography variant="subtitle2" className={classes.price}>
          Price
        </Typography>
      </CardContent>
    </Card>
  );
}
