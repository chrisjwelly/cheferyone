import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { setTabIndex } from "../actions/bottombar-actions";
import { setOrdersTabState } from "../actions/orders-tab-actions";
import NotFound from "./NotFound";
import Cart from "./Cart";
import PaidOrders from "./PaidOrders";

const useStyles = makeStyles((theme) => ({
  root: { paddingTop: theme.spacing(6) },
}));

export default function Orders() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currTabInStore = useSelector((store) => store.ordersTab.index);
  useEffect(() => {
    dispatch(setTabIndex(2));

    dispatch(setOrdersTabState(true)); // show tabs
    return () => dispatch(setOrdersTabState(false)); // hide tabs
  }, [dispatch]);

  return (
    <div className={classes.root}>
      {currTabInStore === 0 ? (
        <Cart />
      ) : currTabInStore === 1 ? (
        <PaidOrders />
      ) : (
        <NotFound />
      )}
    </div>
  );
}
