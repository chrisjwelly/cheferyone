import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LinesEllipsis from "react-lines-ellipsis";

const useStyles = makeStyles({
  showMoreButtonContainer: {
    textAlign: "center",
  },
});

export default function MenuDetails({ description, price }) {
  const classes = useStyles();

  const descriptionRef = useRef(null);
  const [isTooLong, setIsTooLong] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (descriptionRef && descriptionRef.current) {
      setIsTooLong(descriptionRef.current.isClamped());
    }
  }, [descriptionRef]);

  return (
    <div>
      <Typography variant="h5">Details</Typography>
      <Typography variant="h6">{`S$${price}`}</Typography>
      <Typography variant="body1" component="div">
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
    </div>
  );
}
