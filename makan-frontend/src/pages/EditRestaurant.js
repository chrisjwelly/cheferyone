import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import RestaurantForm from "../components/RestaurantForm";
import { openSuccessSnackBar } from "../actions/snackbar-actions";
import { useGet, usePost } from "../utils/rest-utils";
import RenderResponse from "../components/RenderResponse";

export default function EditRestaurant() {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await post();
    if (res) {
      dispatch(openSuccessSnackBar("Restaurant updated!!"));

      // Hack to refresh page with router
      history.push("/");
      history.push("/your-restaurant");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <RenderResponse {...res}>
      {(data) => (
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
      )}
    </RenderResponse>
  );
}
