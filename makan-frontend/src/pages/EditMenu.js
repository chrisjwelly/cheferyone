import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ReactGA from "react-ga";

import { setTabIndex } from "../actions/bottombar-actions";
import { useGet, usePost } from "../utils/rest-utils";
import MenuForm from "../components/MenuForm";
import { openSuccessSnackBar } from "../actions/snackbar-actions";
import LoadingCenter from "../components/LoadingCenter";

export default function EditMenuWrapper() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setTabIndex(1));
  }, [dispatch]);

  const { isLoading } = useGet(`/api/v1/menus/${id}/belongs`);
  if (isLoading) {
    return <LoadingCenter />;
  } else {
    return <EditMenu id={id} />;
  }
}

function EditMenu({ id }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading: isPageLoading, data } = useGet(`/api/v1/menus/${id}`);

  const [fields, setFields] = useState({
    name: "",
    description: "",
    price: "",
    new_preorders: [],
    edited_preorders: [],
    deleted_preorders: [],
    tags: [],
  });
  const [preorders, setPreorders] = useState([]);

  const [imageBlob, setImageBlob] = useState(null);

  useEffect(() => {
    if (data) {
      setFields((fields) => ({
        ...fields,
        name: data.name,
        description: data.description,
        price: data.price,
        tags: data.tags.map((tag) => tag.name),
      }));

      setPreorders(data.preorders);
    }
  }, [data]);

  const [isLoading, setIsLoading] = useState(false);

  const { errors, post, resetErrors } = usePost();

  const onSubmit = async (e) => {
    ReactGA.event({
      category: "Editing a Menu",
      action: "User is editing a menu item",
    })
    e.preventDefault();
    setIsLoading(true);

    const res = await post(
      {
        menu: {
          ...fields,
          new_preorders: fields.new_preorders.map((p) => removeStatusAndId(p)),
          edited_preorders: fields.edited_preorders.map((p) => removeStatus(p)),
        },
      },
      `/api/v1/your_restaurant/menus/${id}`,
      "PATCH",
      imageBlob
    );
    if (res) {
      dispatch(openSuccessSnackBar("Menu updated!"));
      history.push(`/menu/${res.data.id}`);
    } else {
      setIsLoading(false);
    }
  };
  if (isPageLoading) {
    return <LoadingCenter />;
  } else {
    return (
      <MenuForm
        fields={fields}
        preorders={preorders}
        currentPreorder={data.current_preorder}
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
    );
  }
}

function removeStatus(preorder) {
  const removed = { ...preorder };
  delete removed["status"];
  return removed;
}

function removeStatusAndId(preorder) {
  const removed = { ...preorder };
  delete removed["status"];
  delete removed["id"];
  return removed;
}
