// import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import { useDispatch, useSelector } from "react-redux";
// import MenuListCard from "../components/MenuListCard";
// import LinesEllipsis from "react-lines-ellipsis";
// import IconButton from "@material-ui/core/IconButton";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
// import { useHistory } from "react-router-dom";
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";
// import clsx from "clsx";

// import InfiniteScroll from "../components/InfiniteScroll";
// import RenderResponse from "../components/RenderResponse";
// import NotFound from "./NotFound";
// import CreateRestaurant from "./CreateRestaurant";
// import EditRestaurant from "./EditRestaurant";
// import {
//   setRestaurantTabState,
//   setRestaurantTabIndex,
// } from "../actions/restaurant-tab-actions";
// import { setTabIndex } from "../actions/bottombar-actions";
// import { openDialog, closeDialog } from "../actions/dialog-actions";
// import { useGet, usePost } from "../utils/rest-utils";
// import { openSuccessSnackBar } from "../actions/snackbar-actions";

export default function RestaurantOrders() {
  // const res = useGet("/api/v1/your_restaurant");
  // console.log(res.data);
  return null;
}

// // {(data) =>
// //   Object.keys(data).map((restaurant) =>
// //     data[restaurant].map((order) => <MenuListCard name={order.name} />)
// //   )
// // }