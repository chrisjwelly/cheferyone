import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import VisibilitySensor from "react-visibility-sensor";

import NotFound from "./NotFound";
import MenuListCard from "../components/MenuListCard";
import { setTabIndex } from "../actions/bottombar-actions";
import { useInfinite } from "../utils/rest-utils";
import RenderResponse from "../components/RenderResponse";
import RatingStars from "../components/RatingStars";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
  },
  menuListCard: {
    marginBottom: theme.spacing(2),
  },
  bottomContainer: {
    textAlign: "center",
  },
}));

export default function ListMenu({ section }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabIndex(0));
  }, [dispatch]);

  switch (section) {
    case "recommended":
      return (
        <MenuList title="Recommended" apiPath="/api/v1/menus/recommended" />
      );
    case "nearby":
      return <MenuList title="Near You" apiPath="/api/v1/menus/recommended" />;
    case "new":
      return <MenuList title="New" apiPath="/api/v1/menus/recommended" />;
    default:
      return <NotFound />;
  }
}

function MenuList({ title, apiPath }) {
  const classes = useStyles();
  const res = useInfinite(apiPath);
  const { isLoadingNextPage, isEnd, loadNextPage } = res;

  const requestNextPage = (isVisible) => {
    if (isVisible && !isEnd && !isLoadingNextPage) {
      loadNextPage();
    }
  };

  return (
    <RenderResponse {...res}>
      {(data) => (
        <div className={classes.root}>
          <Typography variant="h6">{title}</Typography>
          {data.map((menus) => {
            return menus.map((menu) => (
              <MenuListCard
                className={classes.menuListCard}
                key={menu.id}
                name={menu.name}
                link={`/menu/${menu.id}`}
                image="/logan.jpg"
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {`S$${menu.price}`}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  placeholder
                </Typography>
                <RatingStars size="small" rating={menu.rating} />
              </MenuListCard>
            ));
          })}
          <VisibilitySensor onChange={requestNextPage} delayedCall={true}>
            <div className={classes.bottomContainer}>
              {isLoadingNextPage && !isEnd ? (
                <CircularProgress color="secondary" />
              ) : !isEnd ? (
                <Button color="primary" onClick={() => requestNextPage(true)}>
                  Load More
                </Button>
              ) : (
                <Typography variant="caption">
                  When you are at rock bottom... the only way is up :')
                </Typography>
              )}
            </div>
          </VisibilitySensor>
        </div>
      )}
    </RenderResponse>
  );
}
