import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
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
import TextField from "@material-ui/core/TextField";

import LoadingButton from "../components/LoadingButton";
import CancelButton from "../components/CancelButton";
import ImageUpload from "../components/ImageUpload";
import InfiniteScroll from "../components/InfiniteScroll";
import RenderResponse from "../components/RenderResponse";
import NotFound from "../pages/NotFound";
import { setRestaurantTabState } from "../actions/restaurant-tab-actions";
import { setTabIndex } from "../actions/bottombar-actions";
import { openDialog, closeDialog } from "../actions/dialog-actions";
import { openSuccessSnackBar } from "../actions/snackbar-actions";
import { useGet, usePost } from "../utils/rest-utils";

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
  creationTextContainer: {
    textAlign: "center",
  },
  editPictureContainer: {
    textAlign: "center",
  },
}));

export default function YourRestaurant() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currTab = useSelector((state) => state.restaurantTab.index);

  const res = useGet("/api/v1/your_restaurant");
  const isExist = res && !res.isLoading && !res.error;

  useEffect(() => {
    dispatch(setTabIndex(1));

    if (isExist) {
      dispatch(setRestaurantTabState(true)); // show tabs
    }

    return () => dispatch(setRestaurantTabState(false)); // hide tabs
  }, [dispatch, isExist]);

  return (
    <div className={clsx(isExist && classes.root)}>
      <RenderResponse {...res} skipUnauthorized>
        {() => <RenderTab index={currTab} isExist={isExist} />}
      </RenderResponse>
    </div>
  );
}

function RenderTab({ index, isExist }) {
  if (!isExist) {
    return <CreateRestaurant />;
  } else if (index === 0) {
    return <MenuTab />;
  } else if (index === 1) {
    return <h1>Tab 1</h1>;
  } else if (index === 2) {
    return <h1>Tab 2</h1>;
  } else {
    return <NotFound />;
  }
}

function CreateRestaurant() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const [fields, setFields] = useState({
    location: "",
    description: "",
  });

  const [errors, post, resetErrors] = usePost(
    { restaurant: fields },
    {
      location: undefined,
      description: undefined,
    },
    `/api/v1/your_restaurant`,
    "POST",
    imageBlob
  );

  const onChange = (e) => {
    resetErrors();
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await post();
    if (res) {
      dispatch(openSuccessSnackBar("Restaurant created!"));
      history.push("/your-restaurant");
    } else {
      setIsLoading(false);
    }
  };
  const classes = useStyles();

  return (
    <>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <Grid container spacing={2} className={classes.creationTextContainer}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              In this app, anyone can create their dream restaurant.
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Including you.
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Start your journey today!
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.editPictureContainer}>
            <ImageUpload setImageBlob={setImageBlob} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Location"
              name="location"
              error={errors.location !== undefined}
              onChange={onChange}
              value={fields.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="description"
              error={errors.description !== undefined}
              label="Description"
              onChange={onChange}
              value={fields.description}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              isLoading={isLoading}
            >
              Create
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            <CancelButton
              description="Any unsaved changes will be lost"
              header="Cancel Creation?"
              fullWidth
            >
              Cancel
            </CancelButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

function MenuTab() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const edit = (e, id) => {
    e.preventDefault();
    history.push(`/menu/${id}/edit`);
  };
  const remove = (e, id) => {
    e.preventDefault();
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
    <div>
      <Fab className={classes.fab} color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
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
                  {`S$${menu.price}`}
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
                  {`Status: ${"placeholder"}`}
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
    </div>
  );
}
