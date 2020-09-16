import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import NotFound from "./NotFound";
import MenuListCard from "../components/MenuListCard";
import { setTabIndex } from "../actions/bottombar-actions";
import RatingStars from "../components/RatingStars";
import InfiniteScroll from "../components/InfiniteScroll";

const useStyles = makeStyles((theme) => ({
  menuListCard: {
    marginBottom: theme.spacing(2),
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

  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <InfiniteScroll apiPath={apiPath}>
        {(data) =>
          data.map((menus) => {
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
          })
        }
      </InfiniteScroll>
    </div>
  );
}
