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
import { useGet, usePost } from "../utils/rest-utils";
import RenderResponse from "../components/RenderResponse";
import { openDialog, closeDialog } from "../actions/dialog-actions";
import MenuPreorders from "../components/MenuPreorders";
import { openSuccessSnackBar } from "../actions/snackbar-actions";

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

  const deletePost = usePost(
    {},
    {},
    `/api/v1/your_restaurant/menus/${id}`,
    "DELETE"
  )[1];

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
            onClick={async () => {
              dispatch(closeDialog());
              const res = await deletePost();

              if (res) {
                dispatch(openSuccessSnackBar("Menu deleted!"));
                history.push("/your-restaurant");
              }
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
          <MenuDetails
            tags={data.tags}
            description={data.description}
            price={data.price}
          />
          <MenuPreorders preorders={data.preorders} />
          {data.current_preorder && (
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                className={classes.button}
                onClick={orderButtonOnClick}
              >
                Order Now!
              </Button>
            </div>
          )}
          <MenuOrderDrawer
            open={isOrderOpen}
            onClose={() => setIsOrderOpen(false)}
            name={data.name}
            image={data.image_url}
            price={data.price}
            deliveryFee="3 (placeholder)"
            collectionDate={
              data.current_preorder && data.current_preorder.collection_date
            }
          />
        </div>
      )}
    </RenderResponse>
  );
}
