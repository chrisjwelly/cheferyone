import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import MenuListCard from "../components/MenuListCard";
import LinesEllipsis from "react-lines-ellipsis";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

import InfiniteScroll from "../components/InfiniteScroll";
import { setRestaurantTabState } from "../actions/restaurant-tab-actions";
import { setTabIndex } from "../actions/bottombar-actions";

const useStyles = makeStyles((theme) => ({
  root: { paddingTop: theme.spacing(6) },
  menuListCard: {
    marginBottom: theme.spacing(2),
  },
  description: {
    width: "100%",
    overflow: "hidden",
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

  const edit = (e) => {
    e.preventDefault()
  }
  const remove = (e) => {
    e.preventDefault()
  }

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
                className={classes.description}
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
                {`Status: ${"placeholder"}`}
              </Typography>
              <Grid container>
                <Grid item>
                  <IconButton onClick={edit}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={remove}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </MenuListCard>
          ));
        })
      }
    </InfiniteScroll>
  );
}
