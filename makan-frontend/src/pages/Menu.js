import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import { setTabIndex } from "../actions/bottombar-actions";
import MenuHeader from "../components/MenuHeader";
import MenuDetails from "../components/MenuDetails";
import MenuOrderDrawer from "../components/MenuOrderDrawer";
import { useGet } from "../utils/rest-utils";
import RenderResponse from "../components/RenderResponse";
import LoadingButton from "../components/LoadingButton";
import { openDialog, closeDialog } from "../actions/dialog-actions";
import { uploadImage } from "../utils/rest-utils";
import ImageUpload from "../components/ImageUpload";

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
  editPictureContainer: {
    textAlign: "center",
  },
  editPicture: {
    objectFit: "cover",
    height: theme.breakpoints.values.sm / 3,
    width: theme.breakpoints.values.sm / 3,
    boxShadow: theme.shadows[1],
  },
  editPictureButton: {
    boxShadow: theme.shadows[24],
    backgroundColor: theme.palette.secondary.main + "!important",
  },
  editPictureInput: {
    display: "none",
  },
}));

export default function Menu({ isEdit }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setTabIndex(0));
  }, [dispatch]);

  const res = useGet(`/api/v1/menus/${id}/belongs`);
  if (isEdit) {
    return (
      <RenderResponse {...res}>{() => <EditMenu id={id} />}</RenderResponse>
    );
  }

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

function EditMenu({ id }) {
  const history = useHistory();
  const classes = useStyles();
  const res = useGet(`/api/v1/menus/${id}`);
  const dispatch = useDispatch();

  const [textFields, setTextFields] = useState({
    description: "",
    name: "",
    price: "",
  });
  const [imageBlob, setImageBlob] = useState(null);

  useEffect(() => {
    if (res.data) {
      setTextFields({
        description: res.data.description,
        name: res.data.name,
        price: res.data.price,
      });
    }
  }, [res.data]);

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsLoading(false);
    console.log("placeholder");
  };
  const onChange = (e) => {
    setTextFields({
      ...textFields,
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
            No
          </Button>
          <Button
            color="primary"
            onClick={() => {
              dispatch(closeDialog());
              history.goBack();
            }}
          >
            Yes
          </Button>
        </>
      )
    );

  return (
    <RenderResponse {...res}>
      {(data) => (
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.editPictureContainer}>
              <ImageUpload
                initialImage={data.image_url}
                setImageBlob={setImageBlob}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Name"
                name="name"
                onChange={onChange}
                value={textFields.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Price</InputLabel>
                <OutlinedInput
                  type="number"
                  value={textFields.price}
                  name="price"
                  onChange={onChange}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  labelWidth={60}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="description"
                label="Description"
                onChange={onChange}
                value={textFields.description}
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
