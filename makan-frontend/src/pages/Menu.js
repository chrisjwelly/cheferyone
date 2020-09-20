import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { setTabIndex } from "../actions/bottombar-actions";
import MenuHeader from "../components/MenuHeader";
import MenuDetails from "../components/MenuDetails";
import MenuOrderDrawer from "../components/MenuOrderDrawer";
import { useGet } from "../utils/rest-utils";
import RenderResponse from "../components/RenderResponse";
import { openDialog, closeDialog } from "../actions/dialog-actions";

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
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setTabIndex(0));
  }, [dispatch]);

  const res = useGet(`/api/v1/menus/${id}/belongs`);

  return <MenuView id={id} isOwner={!res.isLoading && !res.error} />;
}

function MenuView({ id, isOwner }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const res = useGet(`/api/v1/menus/${id}`);
  const currUser = useSelector((store) => store.auth.user);
  const classes = useStyles();
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const orderButtonOnClick = () => {
    if (!_.isEmpty(currUser)) {
      setIsOrderOpen(true);
    } else {
      history.push("/login");
    }
  };

  const edit = () => {
    history.push(`/menu/${id}/edit`);
  };

  const remove = () => {
    dispatch(
      openDialog(
        "Delete Menu?",
        "This action is irreversible!",
        <>
          <Button color="primary" onClick={() => dispatch(closeDialog())}>
            No
          </Button>
          <Button
            color="primary"
            onClick={() => {
              dispatch(closeDialog());
              console.log("placeholder");
            }}
          >
            Yes
          </Button>
        </>
      )
    );
  };

  return (
    <RenderResponse {...res}>
      {(data) => (
        <div className={classes.root}>
          <MenuHeader
            name={data.name}
            homecook="placeholder"
            image={data.image_url}
            rating={data.rating}
          />
          {isOwner && (
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
          )}
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
            image={data.image_url}
            price={data.price}
            deliveryFee="3 (placeholder)"
            deliveryDate="26th September 2020 9:00AM to 5:00PM (placeholder)"
          />
        </div>
      )}
    </RenderResponse>
  );
}