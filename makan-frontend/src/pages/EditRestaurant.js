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

export default function EditRestaurant() {
  const dispatch = useDispatch();
  const { isLoading: isPageLoading, data } = useGet(`/api/v1/your_restaurant`);

  const [isLoading, setIsLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const [fields, setFields] = useState({
    location: "",
    description: "",
  });

  useEffect(() => {
    if (data) {
      setFields({
        location: data.location,
        description: data.description,
      });
    }
  }, [data]);

  const { errors, post, resetErrors } = usePost();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await post(
      { restaurant: fields },
      `/api/v1/your_restaurant`,
      "PATCH",
      imageBlob
    );
    if (res) {
      dispatch(openSuccessSnackBar("Restaurant updated!!"));
      window.location.reload();
    } else {
      setIsLoading(false);
    }
  };

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
        <IconButton onClick={remove}>
          <DeleteIcon fontSize="large" />
        </IconButton>
        <RestaurantForm
          fields={fields}
          setFields={(fields) => {
            resetErrors();
            setFields(fields);
          }}
          setImageBlob={setImageBlob}
          initialImage={data.image_url}
          errors={errors}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}
