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
import { openDialog, closeDialog } from "../actions/dialog-actions";
import MenuPreorders from "../components/MenuPreorders";
import { openSuccessSnackBar } from "../actions/snackbar-actions";
import LoadingCenter from "../components/LoadingCenter";
import GreenButton from "../components/GreenButton";
import MenuReviews from "../components/MenuReviews";

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
}));

export default function Menu() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(setTabIndex(0));
  }, [dispatch]);

  const { id } = useParams();

  const { isLoading: isNotOwner } = useGet(
    `/api/v1/menus/${id}/belongs`,
    true,
    true
  );
  const { isLoading, data } = useGet(`/api/v1/menus/${id}`);

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

  const { post } = usePost();

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
              const res = await post(
                {},
                `/api/v1/your_restaurant/menus/${id}`,
                "DELETE"
              );

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

  if (isLoading) {
    return <LoadingCenter />;
  } else {
    return (
      <div className={classes.root}>
        <MenuHeader
          name={data.name}
          homecook={data.username}
          image={data.image_url}
          rating={data.rating}
        />
        {!isNotOwner && (
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
        <MenuReviews id={id} />
        {data.current_preorder && isNotOwner && (
          <div className={classes.buttonContainer}>
            <GreenButton variant="contained" onClick={orderButtonOnClick}>
              Order Now!
            </GreenButton>
          </div>
        )}
        {data.current_preorder && isNotOwner && (
          <MenuOrderDrawer
            open={isOrderOpen}
            onClose={() => setIsOrderOpen(false)}
            name={data.name}
            image={data.image_url}
            price={data.price}
            current_preorder={data.current_preorder}
            isAddToCart={true}
            apiPath="/api/v1/orders"
            method="POST"
          />
        )}
      </div>
    );
  }
}
