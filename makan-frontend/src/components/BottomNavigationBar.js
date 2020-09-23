import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import clsx from "clsx";

import { setIsShowSearchOverlay } from "../actions/search-actions";

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    textAlign: "center",
    height: theme.spacing(8),
    zIndex: theme.zIndex.appBar
  },
}));

export default function BottomNavigationBar({ className }) {
  const classes = useStyles();
  const activeTab = useSelector((state) => state.activeTab);
  const dispatch = useDispatch();

  return (
    <BottomNavigation
      value={activeTab}
      showLabels
      className={clsx(className, classes.root)}
      onClick={() => dispatch(setIsShowSearchOverlay(false))}
    >
      <BottomNavigationAction
        label="Menus"
        icon={<MenuBookIcon />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Your Restaurant"
        icon={<RestaurantIcon />}
        component={Link}
        to="/your-restaurant"
      />
      <BottomNavigationAction
        label="Orders"
        icon={<ShoppingCartIcon />}
        component={Link}
        to="/orders"
      />
      <BottomNavigationAction
        label="Profile"
        icon={<PersonIcon />}
        component={Link}
        to="/profile"
      />
    </BottomNavigation>
  );
}
