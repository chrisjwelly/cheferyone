import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import LoadingButton from "./LoadingButton";
import ImageUpload from "./ImageUpload";
import CancelButton from "./CancelButton";
import ChoosePreorder from "./ChoosePreorder";
import SelectTag from "./SelectTag";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  editPictureContainer: {
    textAlign: "center",
  },
}));

export default function MenuForm({
  fields,
  setFields,
  preorders,
  currentPreorder,
  initialImage,
  setImageBlob,
  errors,
  isLoading,
  onSubmit,
}) {
  const classes = useStyles();

  const { new_preorders, edited_preorders, deleted_preorders } = fields;
  const setNewPreorders = (orders) =>
    setFields({ ...fields, new_preorders: orders });
  const setEditedPreorders = (orders) =>
    setFields({ ...fields, edited_preorders: orders });
  const setDeletedPreorders = (ids) =>
    setFields({ ...fields, deleted_preorders: ids });

  const onChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={classes.root} noValidate onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.editPictureContainer}>
          <ImageUpload
            initialImage={initialImage}
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
            error={errors.name !== undefined}
            onChange={onChange}
            value={fields.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel>Price</InputLabel>
            <OutlinedInput
              type="number"
              value={fields.price}
              name="price"
              error={errors.price !== undefined}
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
            error={errors.description !== undefined}
            value={fields.description}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
      <SelectTag
        selected={fields.tags}
        setSelected={(tags) => setFields({ ...fields, tags })}
      />
      <ChoosePreorder
        existingPreorders={preorders}
        currentPreorder={currentPreorder}
        new_preorders={new_preorders}
        setNewPreorders={setNewPreorders}
        edited_preorders={edited_preorders}
        setEditedPreorders={setEditedPreorders}
        deleted_preorders={deleted_preorders}
        setDeletedPreorders={setDeletedPreorders}
      />
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
      <CancelButton
        description="Any unsaved changes will be lost"
        header="Cancel Edit?"
        fullWidth
      >
        Cancel
      </CancelButton>
    </form>
  );
}
