import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ReactGA from "react-ga";
import isObject from "lodash/isObject";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

import LoadingButton from "./LoadingButton";
import CancelButton from "./CancelButton";
import ImageUpload from "./ImageUpload";
import AutoCompleteLocation from "./AutoCompleteLocation";
import { usePost } from "../utils/rest-utils";
import { getLatLngFromPlace } from "../utils/general";
import { openSuccessSnackBar } from "../actions/snackbar-actions";
import SelectTags from "./SelectTag";

const useStyles = makeStyles({
  creationTextContainer: {
    textAlign: "center",
  },
  editPictureContainer: {
    textAlign: "center",
  },
  locationError: {
    borderStyle: "solid",
    borderColor: "red",
  },
});

export default function RestaurantForm({
  fields,
  setFields,
  initialImage,
  imageBlob,
  setImageBlob,
  isEdit,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { errors, post, resetErrors } = usePost();
  const [hasLocationError, setHasLocationError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    resetErrors();
    setHasLocationError(false);
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const setTags = (tags) => {
    resetErrors();
    setHasLocationError(false);
    setFields({ ...fields, tags });
  };

  const onSubmit = async (e) => {
    if (!isEdit) {
      ReactGA.event({
        category: "Creating a Restaurant",
        action: "User is creating a restaurant",
      });
    } else {
      ReactGA.event({
        category: "Editing a Restaurant",
        action: "User is editing a restaurant",
      });
    }
    e.preventDefault();

    setIsLoading(true);

    const latLng = await getLatLngFromPlace(
      fields.location,
      fields.latitude,
      fields.longitude,
      () => setHasLocationError(true)
    );

    if (!latLng) {
      // Location error
      setIsLoading(false);
      return;
    }

    const res = await post(
      {
        restaurant: {
          location:
            isObject(fields.location) && "description" in fields.location
              ? fields.location.description
              : fields.location,
          latitude: latLng.lat,
          longitude: latLng.lng,
          description: fields.description,
          tags: fields.tags,
        },
      },
      `/api/v1/your_restaurant`,
      !isEdit ? "POST" : "PATCH",
      imageBlob
    );

    if (res && res !== "offline") {
      dispatch(
        openSuccessSnackBar(`Restaurant ${isEdit ? "updated" : "created"}!`)
      );

      history.push("/");
      history.push("/your-restaurant");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form noValidate onSubmit={onSubmit}>
      <Grid container spacing={2} className={classes.creationTextContainer}>
        <Grid item xs={12} className={classes.editPictureContainer}>
          <ImageUpload
            setImageBlob={setImageBlob}
            initialImage={initialImage}
          />
        </Grid>

        <Grid item xs={12}>
          <AutoCompleteLocation
            value={fields.location}
            setValue={(newValue) => {
              setFields({ ...fields, location: newValue });
            }}
            onChange={() => setHasLocationError(false)}
            className={clsx(hasLocationError && classes.locationError)}
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
        <Grid item xs={12} style={{ align: "left" }}>
          <SelectTags selected={fields.tags} setSelected={setTags} />
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
            Submit
          </LoadingButton>
        </Grid>
        <Grid item xs={12}>
          <CancelButton
            description="Any unsaved changes will be lost"
            header="Cancel Creation?"
            gotoAfterCancel="/your-restaurant"
            fullWidth
          >
            Cancel
          </CancelButton>
        </Grid>
      </Grid>
    </form>
  );
}
