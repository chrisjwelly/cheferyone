import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import MenuListCard from "../components/MenuListCard";
import LinesEllipsis from "react-lines-ellipsis";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";

import InfiniteScroll from "../components/InfiniteScroll";
import NotFound from "./NotFound";
import CreateRestaurant from "./CreateRestaurant";
import EditRestaurant from "./EditRestaurant";
import RestaurantOrders from "./RestaurantOrders";
import {
  setRestaurantTabState,
  setRestaurantTabIndex,
} from "../actions/restaurant-tab-actions";
import { setTabIndex } from "../actions/bottombar-actions";
import { openDialog, closeDialog } from "../actions/dialog-actions";
import { useGet, usePost } from "../utils/rest-utils";
import { openSuccessSnackBar } from "../actions/snackbar-actions";
import { stringToMoney } from "../utils/general";
import LoadingCenter from "../components/LoadingCenter";

const useStyles = makeStyles((theme) => ({
  root: { paddingTop: theme.spacing(6) },
  menuListCard: {
    marginBottom: theme.spacing(2),
  },
  description: {
    width: "100%",
    overflow: "hidden",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(3),
  },
}));

export default function Homecook() {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <InfiniteScroll apiPath={"/api/v1/your_restaurant/menus"}>
      {(data) =>
        data.map((menus) => {
          return menus.map((menu) => (
            <MenuListCard
              className={classes.menuListCard}
              key={menu.id}
              name={menu.name}
              link={`/menu/${menu.id}`}
              image={menu.image_url}
            >
              <Typography variant="subtitle2" color="textSecondary">
                {`S$${stringToMoney(menu.price)}`}
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
                {`Status: ${menu.current_preorder ? "Open" : "Closed"}`}
              </Typography>
              <Grid container>
                <Grid item>
                  <IconButton onClick={(e) => edit(e, menu.id)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={(e) => remove(e, menu.id)}>
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
