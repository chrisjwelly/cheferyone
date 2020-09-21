import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LinesEllipsis from "react-lines-ellipsis";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  showMoreButtonContainer: {
    textAlign: "center",
  },
  description: {
    overflowWrap: "anywhere",
  },
  tagsContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default function MenuDetails({ tags, description, price }) {
  const classes = useStyles();

  const descriptionRef = useRef();
  const [isTooLong, setIsTooLong] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (descriptionRef && descriptionRef.current) {
      setIsTooLong(descriptionRef.current.isClamped());
    }
  }, [descriptionRef, description]);

  return (
    <div>
      <Typography variant="h5">Details</Typography>
      <Typography variant="h6">{`S$${price}`}</Typography>
      <Typography
        className={classes.description}
        variant="body1"
        component="div"
      >
        {!isExpanded && (
          <LinesEllipsis
            text={description}
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="letters"
            ref={descriptionRef}
          />
        )}
        <Collapse in={isExpanded}>{description}</Collapse>
      </Typography>
      {isTooLong && (
        <div className={classes.showMoreButtonContainer}>
          <Button onClick={() => setIsExpanded(!isExpanded)} color="secondary">
            {isExpanded ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
      <Grid container className={classes.tagsContainer} spacing={1}>
        {tags.map((tag, i) => (
          <Grid item key={i}>
            <Chip size="small" key={i} label={tag.name} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
