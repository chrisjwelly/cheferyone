import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { setTabIndex } from "../actions/bottombar-actions";
import MenuHeader from "../components/MenuHeader";
import MenuDetails from "../components/MenuDetails";
import MenuOrderDrawer from "../components/MenuOrderDrawer";
import { useGet } from "../utils/rest-utils";
import RenderResponse from "../components/RenderResponse";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(5),
  },
  buttonContainer: {
    textAlign: "center",
    position: "fixed",
    bottom: theme.spacing(9),
    right: 0,
    left: 0,
    marginRight: "auto",
    marginLeft: "auto",
  },
  button: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
    color: theme.palette.common.white,
  },
}));

export default function Menu() {
  const { id } = useParams();
  const history = useHistory();

  const res = useGet(`/api/v1/menus/${id}`);
  const currUser = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  useEffect(() => {
    dispatch(setTabIndex(0));
  }, [dispatch]);

  const orderButtonOnClick = () => {
    if (!_.isEmpty(currUser)) {
      setIsOrderOpen(true);
    } else {
      history.push("/login");
    }
  };

  return (
    <RenderResponse {...res}>
      {(data) => (
        <div className={classes.root}>
          <MenuHeader
            name={data.name}
            homecook="placeholder"
            image="/logan.jpg"
            rating={data.rating}
          />
          <MenuDetails description={data.description} price={data.price} />
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={orderButtonOnClick}
            >
              Order Now!
            </Button>
          </div>
          <MenuOrderDrawer
            open={isOrderOpen}
            onClose={() => setIsOrderOpen(false)}
            name={data.name}
            image="/logan.jpg"
            price={data.price}
            deliveryFee="3 (placeholder)"
            deliveryDate="26th September 2020 9:00AM to 5:00PM (placeholder)"
          />
        </div>
      )}
    </RenderResponse>
  );
}
