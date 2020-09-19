import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import VisibilitySensor from "react-visibility-sensor";

import { useInfinite } from "../utils/rest-utils";
import RenderResponse from "../components/RenderResponse";

const useStyles = makeStyles({
  bottomContainer: {
    textAlign: "center",
  },
});

export default function InfiniteScroll({ apiPath, children }) {
  const classes = useStyles();
  const res = useInfinite(apiPath);
  const { isLoadingNextPage, isEnd, loadNextPage } = res;

  const requestNextPage = (isVisible) => {
    if (isVisible && !isEnd && !isLoadingNextPage) {
      loadNextPage();
    }
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const setOnline = () => setIsOnline(true);
    const setOffline = () => setIsOnline(false);

    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return (
    <RenderResponse {...res}>
      {(data) => (
        <>
          {children(data)}
          <VisibilitySensor
            onChange={(isVisible) => {
              if (isOnline) {
                requestNextPage(isVisible);
              }
            }}
            delayedCall={true}
          >
            <div className={classes.bottomContainer}>
              {isLoadingNextPage && !isEnd ? (
                <CircularProgress color="secondary" />
              ) : !isEnd ? (
                <Button
                  disabled={!isOnline}
                  color="primary"
                  onClick={() => requestNextPage(true)}
                >
                  Load More
                </Button>
              ) : (
                <Typography variant="caption">
                  {res.data[0].length > 0
                    ? "When you are at rock bottom... the only way is up :')"
                    : "Nothing here yet!"}
                </Typography>
              )}
            </div>
          </VisibilitySensor>
        </>
      )}
    </RenderResponse>
  );
}
