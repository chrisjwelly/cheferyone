import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { setTabIndex } from "../actions/bottombar-actions";
import { useGet, usePost } from "../utils/rest-utils";
import RenderResponse from "../components/RenderResponse";
import MenuForm from "../components/MenuForm";
import { openSuccessSnackBar } from "../actions/snackbar-actions";

export default function CreateMenuWrapper() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setTabIndex(1));
  }, [dispatch]);

  const res = useGet("/api/v1/your_restaurant");
  return (
    <RenderResponse {...res}>{() => <CreateMenu id={id} />}</RenderResponse>
  );
}

function CreateMenu({ id }) {
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

  const [errors, post, resetErrors] = usePost(
    {
      menu: {
        ...fields,
        new_preorders: fields.new_preorders.map((p) => removeStatusAndId(p)),
      },
    },
    {
      name: undefined,
      description: undefined,
      price: undefined,
    },
    `/api/v1/your_restaurant/menus/`,
    "POST",
    imageBlob
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await post();
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
