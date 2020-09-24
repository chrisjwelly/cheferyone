import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Chip from "@material-ui/core/Chip";

import CollapsibleText from "./CollapsibleText";
import SubscribeButton from "../components/SubscribeButton";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    boxShadow: theme.shadows[3],
  },
}));

export default function ChefHeader({
  image_url,
  username,
  description,
  location,
  tags,
  isOwner,
}) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} alignItems="center">
      <Grid item xs={5}>
        <Avatar alt={username} src={image_url} className={classes.avatar} />
      </Grid>
      <Grid item xs={7}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">{username}</Typography>
          </Grid>
          {!isOwner && (
            <Grid item xs={12}>
              <SubscribeButton size="small" chefName={username} />
            </Grid>
          )}
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center" wrap="nowrap">
              <LocationOnIcon />
              <Typography variant="caption">{location}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CollapsibleText text={description} />
          </Grid>
          <Grid item>
            <Grid container spacing={1} className={classes.tags}>
              {tags.map((t, i) => (
                <Grid item key={i}>
                  <Chip label={t.name} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
