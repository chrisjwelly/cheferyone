import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import VisibilitySensor from "react-visibility-sensor";

import NotFound from "./NotFound";
import MenuListCard from "../components/MenuListCard";
import LoadingCenter from "../components/LoadingCenter";
import { setTabIndex } from "../actions/bottombar-actions";
import { useInfinite } from "../utils/rest-utils";

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
  const { data, isLoading, isEnd, loadNextPage } = useInfinite(apiPath);
  const requestNextPage = (isVisible) => {
    if (isVisible && !isEnd && !isLoading) {
      loadNextPage();
    }
  };

  if (!data) {
    return <LoadingCenter />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6">{title}</Typography>
      {data.map((menus) => {
        return menus.map((menu) => (
          <MenuListCard
            className={classes.menuListCard}
            key={menu.id}
            name={menu.name + " " + menu.id}
            price={menu.price}
            rating={menu.rating}
            link={`/menu/${menu.id}`}
            image="/logan.jpg"
            homecook="placeholder"
          />
        ));
      })}
      <VisibilitySensor onChange={requestNextPage} delayedCall={true}>
        <div className={classes.bottomContainer}>
          {isLoading && !isEnd ? (
            <CircularProgress color="secondary" />
          ) : !isEnd ? (
            <Button color="primary" onClick={requestNextPage}>
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
  );
}
