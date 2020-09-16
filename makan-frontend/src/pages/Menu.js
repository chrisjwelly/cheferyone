import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { setTabIndex } from "../actions/bottombar-actions";
import MenuHeader from "../components/MenuHeader";
import MenuDetails from "../components/MenuDetails";
import MenuOrderDrawer from "../components/MenuOrderDrawer";
import { useGet } from "../utils/rest-utils";
import RenderResponse from "../components/RenderResponse";
import LoadingButton from "../components/LoadingButton";
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Menu({ isEdit }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setTabIndex(0));
  }, [dispatch]);

  const res = useGet(`/api/v1/menus/${id}`); // placeholder: should check for edit rights
  if (isEdit) {
    return (
      <RenderResponse {...res}>{() => <EditMenu id={id} />}</RenderResponse>
    );
  }

  return <MenuView id={id} />;
}

function MenuView({ id }) {
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

function EditMenu({ id }) {
  const history = useHistory();
  const classes = useStyles();
  const res = useGet(`/api/v1/menus/${id}`);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    description: "",
    name: "",
    price: "",
  });

  useEffect(() => {
    if (res.data) {
      setFormData({
        description: res.data.description,
        name: res.data.name,
        price: res.data.price,
      });
    }
  }, [res.data]);

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const cancel = () =>
    dispatch(
      openDialog(
        "Cancel Edit?",
        "Any unsaved changes will be lost.",
        <>
          <Button color="primary" onClick={() => dispatch(closeDialog())}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              dispatch(closeDialog());
              history.push(`/menu/${id}`);
            }}
          >
            Confirm
          </Button>
        </>
      )
    );

  return (
    <RenderResponse {...res}>
      {() => (
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Name"
                name="name"
                onChange={onChange}
                value={formData.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Price"
                name="price"
                onChange={onChange}
                value={formData.price}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="description"
                label="Description"
                onChange={onChange}
                value={formData.description}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            isLoading={isLoading}
          >
            Save
          </LoadingButton>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            onClick={cancel}
          >
            Cancel
          </Button>
        </form>
      )}
    </RenderResponse>
  );
}
