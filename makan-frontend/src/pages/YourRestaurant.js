import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";

import {
  setRestaurantTabState,
} from "../actions/restaurant-tab-actions";
import { setTabIndex } from "../actions/bottombar-actions";

export default function YourRestaurant() {
  const dispatch = useDispatch();
  const currTab = useSelector((state) => state.restaurantTab.index);

  useEffect(() => {
    dispatch(setTabIndex(1));
    dispatch(setRestaurantTabState(true)); // show tabs

    return () => dispatch(setRestaurantTabState(false)); // hide tabs
  }, [dispatch]);

  return <Typography variant="h6">Restaurant</Typography>;
}
