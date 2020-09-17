import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import MenuCardContainer from "./MenuCardContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
}));

export default function SuggestionsSectionContainer({
  title,
  seeMorePath,
  children,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid item>
          <Button component={Link} to={seeMorePath} color="primary">
            See All
          </Button>
        </Grid>
      </Grid>
      <MenuCardContainer seeMorePath={seeMorePath}>
        {children}
      </MenuCardContainer>
    </div>
  );
}
