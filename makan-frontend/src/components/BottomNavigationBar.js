import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[400]}`,
  },
}));

export default function BottomNavigationBar({ className }) {
  const classes = useStyles();
  const activeTab = useSelector((state) => state.activeTab);

  return (
    <BottomNavigation
      value={activeTab}
      showLabels
      className={clsx(className, classes.root)}
    >
      <BottomNavigationAction
        label="Suggestions"
        icon={<SearchIcon />}
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
