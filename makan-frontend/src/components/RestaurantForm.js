import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import LoadingButton from "../components/LoadingButton";
import CancelButton from "../components/CancelButton";
import ImageUpload from "../components/ImageUpload";

const useStyles = makeStyles({
  creationTextContainer: {
    textAlign: "center",
  },
  editPictureContainer: {
    textAlign: "center",
  },
});

export default function RestaurantForm({
  fields,
  setFields,
  initialImage,
  setImageBlob,
  errors,
  isLoading,
  onSubmit,
}) {
  const classes = useStyles();

  const onChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
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
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Location"
            name="location"
            error={errors.location !== undefined}
            onChange={onChange}
            value={fields.location}
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
