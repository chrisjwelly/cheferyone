import React, { useState } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { setRestaurantTabIndex } from "../actions/restaurant-tab-actions";
import { setOrdersTabIndex } from "../actions/orders-tab-actions";
import { setIsShowSearchOverlay } from "../actions/search-actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fb5530",
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: theme.spacing(0, 1, 0, 2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  exitSearchButton: {
    color: theme.palette.common.white,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function TopAppBar({ hasBell }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isNarrow = useMediaQuery("(max-width:500px)");

  const { index, isShown: isTabsShown } = useSelector(
    (store) => store.restaurantTab
  );
  const { index: ordersTabIndex, isShown: isOrdersTabsShown } = useSelector(
    (store) => store.ordersTab
  );
  const isShowSearchOverlay = useSelector(
    (store) => store.search.isShowSearchOverlay
  );

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <AppBar className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {isNarrow && isShowSearchOverlay ? "" : "Cheferyone"}
          </Typography>
          {isShowSearchOverlay && (
            <IconButton
              onMouseDown={() => {
                dispatch(setIsShowSearchOverlay(false));
              }}
            >
              <ArrowBackIcon className={classes.exitSearchButton} />
            </IconButton>
          )}
          {hasBell && (
            <>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchTerm !== "") {
                      dispatch(setIsShowSearchOverlay(false));
                      history.push(`/search/${searchTerm}`);
                    }
                  }}
                >
                  <InputBase
                    onClick={() => dispatch(setIsShowSearchOverlay(true))}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      dispatch(setIsShowSearchOverlay(true));
                    }}
                    value={searchTerm}
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </form>
              </div>
              <IconButton aria-label="notifications" color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </>
          )}
        </Toolbar>
        {isTabsShown && (
          <Tabs
            centered
            indicatorColor="primary"
            value={index}
            onChange={(_, index) =>
              dispatch(setRestaurantTabIndex(index, history))
            }
            aria-label="your restaurant tabs"
          >
            <Tab label="Menus" />
            <Tab label="Orders" />
            <Tab label="Edit" />
          </Tabs>
        )}
        {isOrdersTabsShown && (
          <Tabs
            centered
            indicatorColor="primary"
            value={ordersTabIndex}
            onChange={(_, index) => dispatch(setOrdersTabIndex(index))}
            aria-label="orders tabs"
          >
            <Tab label="Cart" />
            <Tab label="Paid" />
          </Tabs>
        )}
      </AppBar>
      <Toolbar />
    </>
  );
}
