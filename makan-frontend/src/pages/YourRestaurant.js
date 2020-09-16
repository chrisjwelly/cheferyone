import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import MenuListCard from "../components/MenuListCard";

import InfiniteScroll from "../components/InfiniteScroll";

import { setRestaurantTabState } from "../actions/restaurant-tab-actions";
import { setTabIndex } from "../actions/bottombar-actions";

const useStyles = makeStyles((theme) => ({
  root: { paddingTop: theme.spacing(6) },
  menuListCard: {
    marginBottom: theme.spacing(2),
  },
}));

export default function YourRestaurant() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currTab = useSelector((state) => state.restaurantTab.index);

  useEffect(() => {
    dispatch(setTabIndex(1));
    dispatch(setRestaurantTabState(true)); // show tabs

    return () => dispatch(setRestaurantTabState(false)); // hide tabs
  }, [dispatch]);

  return (
    <div className={classes.root}>
      {currTab === 0 ? <MenuTab /> : <h1>Tab 1</h1>}
    </div>
  );
}

function MenuTab() {
  const classes = useStyles();

  return (
    <InfiniteScroll apiPath={"/api/v1/menus/recommended"}>
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
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="div"
              >
                placeholder
              </Typography>
            </MenuListCard>
          ));
        })
      }
    </InfiniteScroll>
  );
}
