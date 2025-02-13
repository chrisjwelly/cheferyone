import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";

import { PreorderCard } from "./Preorders";

const useStyles = makeStyles({
  showMoreButtonContainer: {
    textAlign: "center",
  },
});

export default function MenuPreorders({ preorders, current_preorder }) {
  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5">Pre-orders</Typography>
      </Grid>
      <Cards preorders={preorders} current_preorder={current_preorder} />
    </Grid>
  );
}

function Cards({ preorders, current_preorder }) {
  const classes = useStyles();

  const [isExpanded, setIsExpanded] = useState(false);

  if (preorders.length === 0) {
    return (
      <Grid item>
        <Typography variant="caption" color="textSecondary">
          No preorders scheduled yet!
        </Typography>
      </Grid>
    );
  }

  return (
    <>
      {!isExpanded && (
        <Grid item xs={12}>
          <PreorderCard
            index={0}
            preorder={preorders[0]}
            isOpenNow={
              current_preorder && current_preorder.id === preorders[0].id
            }
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Collapse in={isExpanded}>
          <Grid item container alignItems="center" spacing={1}>
            {preorders.map((preorder, i) => (
              <Grid item key={i} xs={12} sm={6}>
                <PreorderCard
                  index={i}
                  preorder={preorder}
                  isOpenNow={
                    current_preorder && current_preorder.id === preorder.id
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </Grid>
      {preorders.length > 1 && (
        <Grid item className={classes.showMoreButtonContainer} xs={12}>
          <Button onClick={() => setIsExpanded(!isExpanded)} color="secondary">
            {isExpanded ? "Show Less" : "Show All"}
          </Button>
        </Grid>
      )}
    </>
  );
}
