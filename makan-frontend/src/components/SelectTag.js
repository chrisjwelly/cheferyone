import React from "react";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { TAGS } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default function SelectTag({ selected, setSelected }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">Tags</Typography>
      <Grid container spacing={1}>
        {TAGS.map((tag, i) => (
          <Grid item key={i}>
            {selected.find((s) => s === tag) ? (
              // Pressed
              <Chip
                label={tag}
                onClick={() => setSelected(selected.filter((s) => s !== tag))}
                color="primary"
              />
            ) : (
              // Not pressed
              <Chip
                label={tag}
                onClick={() => setSelected([...selected, tag])}
                variant="outlined"
                color="primary"
              />
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
