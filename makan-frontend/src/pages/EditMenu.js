import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { setTabIndex } from "../actions/bottombar-actions";
import { useGet, usePost } from "../utils/rest-utils";
import RenderResponse from "../components/RenderResponse";
import { uploadImage } from "../utils/rest-utils";
import MenuForm from "../components/MenuForm";
import {
  openSuccessSnackBar,
  openErrorSnackBar,
} from "../actions/snackbar-actions";

export default function EditMenuWrapper() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setTabIndex(1));
  }, [dispatch]);

  const res = useGet(`/api/v1/menus/${id}/belongs`);
  return <RenderResponse {...res}>{() => <EditMenu id={id} />}</RenderResponse>;
}

function EditMenu({ id }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const res = useGet(`/api/v1/menus/${id}`);

  const [fields, setFields] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [imageBlob, setImageBlob] = useState(null);

  useEffect(() => {
    if (res.data) {
      setFields({
        name: res.data.name,
        description: res.data.description,
        price: res.data.price,
      });
    }
  }, [res.data]);

  const [isLoading, setIsLoading] = useState(false);

  const [errors, post, resetErrors] = usePost(
    {
      menu: fields,
    },
    {
      name: undefined,
      description: undefined,
      price: undefined,
    },
    "/api/v1/your_restaurant/menus/"
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (imageBlob === null) {
      // User did not upload image
      submitText();
    } else {
      const imageRes = await uploadImage(imageBlob);

      if (imageRes.hasErrors) {
        setIsLoading(false);
        dispatch(openErrorSnackBar(imageRes.payload));
      } else {
        setFields({ ...fields, image_url: imageRes.payload });
      }
    }
  };

  const submitText = async () => {
    const res = await post();
    if (res) {
      dispatch(openSuccessSnackBar("Menu updated!"));
      history.goBack();
    } else {
      setIsLoading(false);
    }
  };

  const memoizedCallback = useCallback(submitText, [fields]);
  // If image_url is filled in
  useEffect(() => {
    if (fields.image_url) {
      memoizedCallback();
    }
  }, [fields, memoizedCallback]);

  return (
    <RenderResponse {...res}>
      {(data) => (
        <MenuForm
          fields={fields}
          setFields={(e) => {
            resetErrors();
            setFields(e);
          }}
          initialImage={data.image_url}
          setImageBlob={setImageBlob}
          errors={errors}
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      )}
    </RenderResponse>
  );
}
