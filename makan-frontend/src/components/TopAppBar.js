import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useSelector, useDispatch } from "react-redux";

import { setRestaurantTabIndex } from "../actions/restaurant-tab-actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fb5530",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopAppBar({ hasBell }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { index, isShown: isTabsShown } = useSelector(
    (store) => store.restaurantTab
  );

  return (
    <>
      <AppBar className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Cheferyone
          </Typography>
          {hasBell && (
            <IconButton aria-label="notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
        {isTabsShown && (
          <Tabs
            centered
            indicatorColor="primary"
            value={index}
            onChange={(_, index) => dispatch(setRestaurantTabIndex(index))}
            aria-label="your restaurant tabs"
          >
            <Tab label="Menus" />
            <Tab label="Orders" />
            <Tab label="Edit" />
          </Tabs>
        )}
      </AppBar>
      <Toolbar />
    </>
  );
}
