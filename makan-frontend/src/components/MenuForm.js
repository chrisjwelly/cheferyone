import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import LoadingButton from "../components/LoadingButton";
import { openDialog, closeDialog } from "../actions/dialog-actions";
import ImageUpload from "../components/ImageUpload";

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
  initialImage,
  setImageBlob,
  errors,
  isLoading,
  onSubmit,
}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFields({
      ...fields,
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
      <Button variant="contained" fullWidth color="secondary" onClick={cancel}>
        Cancel
      </Button>
    </form>
  );
}
