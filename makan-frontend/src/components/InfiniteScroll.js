import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import VisibilitySensor from "react-visibility-sensor";

import { useInfinite } from "../utils/rest-utils";
import LoadingCenter from "./LoadingCenter";

const useStyles = makeStyles({
  bottomContainer: {
    textAlign: "center",
  },
});

export default function InfiniteScroll({ apiPath, children }) {
  const classes = useStyles();
  const res = useInfinite(apiPath);
  const { data, isLoading, isLoadingNextPage, isEnd, loadNextPage } = res;

  const requestNextPage = (isVisible) => {
    if (isVisible && !isEnd && !isLoadingNextPage) {
      loadNextPage();
    }
  };
  
  if (isLoading) {
    return <LoadingCenter />;
  } else {
    return (
      <div>
        {children(data)}
        <VisibilitySensor
          onChange={(isVisible) => {
            requestNextPage(isVisible);
          }}
          delayedCall={true}
        >
          <div className={classes.bottomContainer}>
            {isLoadingNextPage && !isEnd ? (
              <CircularProgress color="secondary" />
            ) : !isEnd ? (
              <Button color="primary" onClick={() => requestNextPage(true)}>
                Load More
              </Button>
            ) : (
              <Typography variant="caption">
                {res.data[0].length > 0
                  ? "When you are at rock bottom... the only way is up :')"
                  : "It seems a little lonely here..."}
              </Typography>
            )}
          </div>
        </VisibilitySensor>
      </div>
    );
  }
}
