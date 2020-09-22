import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setTabIndex } from "../actions/bottombar-actions";
import { useGet, usePost } from "../utils/rest-utils";
import MenuForm from "../components/MenuForm";
import { openSuccessSnackBar } from "../actions/snackbar-actions";
import LoadingCenter from "../components/LoadingCenter";

export default function CreateMenuWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabIndex(1));
  }, [dispatch]);

  const { isLoading } = useGet("/api/v1/your_restaurant");

  if (isLoading) {
    return <LoadingCenter />;
  } else {
    return <CreateMenu />;
  }
}

function CreateMenu() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    name: "",
    description: "",
    price: "",
    new_preorders: [],
    tags: [],
  });
  const [imageBlob, setImageBlob] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { errors, post, resetErrors } = usePost();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await post(
      {
        menu: {
          ...fields,
          new_preorders: fields.new_preorders.map((p) => removeStatusAndId(p)),
        },
      },
      `/api/v1/your_restaurant/menus/`,
      "POST",
      imageBlob
    );
    
    if (res) {
      dispatch(openSuccessSnackBar("Menu created!"));
      history.push(`/menu/${res.data.id}`);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <MenuForm
      fields={fields}
      preorders={[]}
      setFields={(e) => {
        resetErrors();
        setFields(e);
      }}
      setImageBlob={setImageBlob}
      errors={errors}
      isLoading={isLoading}
      onSubmit={onSubmit}
    />
  );
}

function removeStatusAndId(preorder) {
  const removed = { ...preorder };
  delete removed["status"];
  delete removed["id"];
  return removed;
}
