import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import LinesEllipsis from "react-lines-ellipsis";

import NotFound from "./NotFound";
import MenuListCard from "../components/MenuListCard";
import { setTabIndex } from "../actions/bottombar-actions";
import RatingStars from "../components/RatingStars";
import InfiniteScroll from "../components/InfiniteScroll";
import { stringToMoney } from "../utils/general";

const useStyles = makeStyles((theme) => ({
  menuListCard: {
    marginBottom: theme.spacing(2),
  },
  tags: {
    padding: theme.spacing(1, 0, 1, 0),
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
      return <NearYou />;
    case "new":
      return <MenuList title="New" apiPath="/api/v1/menus/recent" />;
    default:
      return <NotFound />;
  }
}

function NearYou() {
  const location = useSelector((store) => store.location);
  const [hasLocationName, setHasLocationName] = useState(
    !!location && !!location.name
  );
  const [nearbyPath, setNearbyPath] = useState(`/api/v1/menus/near_you`);
  useEffect(() => {
    setHasLocationName(!!location && !!location.name);

    if (!!location) {
      setNearbyPath(
        `/api/v1/menus/near_you?latitude=${location.lat}&longitude=${location.lng}`
      );
    }
  }, [location]);

  return (
    <MenuList
      title="Near You"
      apiPath={nearbyPath}
      locationName={!hasLocationName ? undefined : location.name}
      isNearby
    />
  );
}

function MenuList({ title, apiPath, locationName, isNearby }) {
  const classes = useStyles();

  return (
    <div>
      <InfiniteScroll apiPath={apiPath}>
        {(data) => (
          <>
            <Typography variant="h6">{title}</Typography>
            {isNearby && (
              <Typography variant="caption">{`Your location: ${
                locationName ? locationName : "Singapore"
              }`}</Typography>
            )}
            {data.map((menus) => {
              return menus.map((menu) => {
                return (
                  <MenuListCard
                    className={classes.menuListCard}
                    key={menu.id}
                    name={menu.name}
                    link={`/menu/${menu.id}`}
                    image={menu.image_url}
                  >
                    <Typography variant="subtitle2" color="textSecondary">
                      {`S$${stringToMoney(menu.price)}`}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="div"
                    >
                      <LinesEllipsis
                        text={menu.description}
                        maxLine="2"
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                      />
                    </Typography>
                    <Typography variant="subtitle2">
                      {`Status: ${menu.current_preorder ? "Open" : "Closed"}`}
                    </Typography>
                    <Grid container spacing={1} className={classes.tags}>
                      {menu.tags.map((t, i) => (
                        <Grid item key={i}>
                          <Chip size="small" label={t.name} />
                        </Grid>
                      ))}
                    </Grid>
                    <RatingStars size="small" rating={menu.rating} />
                  </MenuListCard>
                );
              });
            })}
          </>
        )}
      </InfiniteScroll>
    </div>
  );
}
