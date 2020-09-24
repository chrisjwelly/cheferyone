import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import RestaurantForm from "../components/RestaurantForm";
import { openSuccessSnackBar } from "../actions/snackbar-actions";
import { useGet, usePost } from "../utils/rest-utils";
import { openDialog, closeDialog } from "../actions/dialog-actions";
import LoadingCenter from "../components/LoadingCenter";
import { Grid, Typography } from "@material-ui/core";

export default function EditRestaurant() {
  const dispatch = useDispatch();
  const { isLoading: isPageLoading, data } = useGet(`/api/v1/your_restaurant`);

  const [imageBlob, setImageBlob] = useState(null);
  const [fields, setFields] = useState({
    location: null,
    latitude: "",
    longitude: "",
    description: "",
    tags: [],
  });

  useEffect(() => {
    if (data) {
      setFields({
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        description: data.description,
        tags: data.tags.map((t) => t.name),
      });
    }
  }, [data]);

  const { post } = usePost();

  const remove = () => {
    dispatch(
      openDialog(
        "Delete Restaurant?",
        "This action is irreversible!",
        <>
          <Button color="primary" onClick={() => dispatch(closeDialog())}>
            No
          </Button>
          <Button
            color="primary"
            onClick={async () => {
              dispatch(closeDialog());
              const res = await post({}, `/api/v1/your_restaurant/`, "DELETE");

              if (res) {
                dispatch(openSuccessSnackBar("Restaurant deleted!"));
                window.location.reload();
              }
            }}
          >
            Yes
          </Button>
        </>
      )
    );
  };

  if (isPageLoading) {
    return <LoadingCenter />;
  } else {
    return (
      <div>
        <Grid container justify="space-between" spacing={1} alignItems="center">
          <Grid item>
            <Typography variant="h5">Edit Restaurant Details</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={remove}>
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <RestaurantForm
          fields={fields}
          setFields={setFields}
          imageBlob={imageBlob}
          setImageBlob={setImageBlob}
          initialImage={data.image_url}
          isEdit
        />
      </div>
    );
  }
}
