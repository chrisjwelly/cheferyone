import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import RestaurantForm from "../components/RestaurantForm";
import { openSuccessSnackBar } from "../actions/snackbar-actions";
import { useGet, usePost } from "../utils/rest-utils";
import RenderResponse from "../components/RenderResponse";
import { openDialog, closeDialog } from "../actions/dialog-actions";

export default function EditRestaurant() {
  const dispatch = useDispatch();
  const res = useGet(`/api/v1/your_restaurant`);

  const [isLoading, setIsLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const [fields, setFields] = useState({
    location: "",
    description: "",
  });

  useEffect(() => {
    if (res.data) {
      setFields({
        location: res.data.location,
        description: res.data.description,
      });
    }
  }, [res.data]);

  const [errors, post, resetErrors] = usePost(
    { restaurant: fields },
    {
      location: undefined,
      description: undefined,
    },
    `/api/v1/your_restaurant`,
    "PATCH",
    imageBlob
  );

  const deletePost = usePost({}, {}, `/api/v1/your_restaurant/`, "DELETE")[1];

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await post();
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
              const res = await deletePost();

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

  return (
    <RenderResponse {...res}>
      {(data) => (
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
      )}
    </RenderResponse>
  );
}
