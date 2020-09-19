import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import RestaurantForm from "../components/RestaurantForm";
import { openSuccessSnackBar } from "../actions/snackbar-actions";
import { usePost } from "../utils/rest-utils";

export default function CreateRestaurant() {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await post();
    if (res) {
      dispatch(openSuccessSnackBar("Restaurant created!"));

      // Hack to refresh page with router
      history.push("/");
      history.push("/your-restaurant");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <RestaurantForm
      fields={fields}
      setFields={(fields) => {
        resetErrors();
        setFields(fields);
      }}
      setImageBlob={setImageBlob}
      errors={errors}
      isLoading={isLoading}
      onSubmit={onSubmit}
    />
  );
}
