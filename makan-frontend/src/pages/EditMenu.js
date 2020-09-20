import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { setTabIndex } from "../actions/bottombar-actions";
import { useGet, usePost } from "../utils/rest-utils";
import RenderResponse from "../components/RenderResponse";
import MenuForm from "../components/MenuForm";
import { openSuccessSnackBar } from "../actions/snackbar-actions";

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
    new_preorders: [],
    edited_preorders: [],
    deleted_preorders: [],
    tags: [],
  });
  const [preorders, setPreorders] = useState([]);

  const [imageBlob, setImageBlob] = useState(null);

  useEffect(() => {
    if (res.data) {
      setFields((fields) => ({
        ...fields,
        name: res.data.name,
        description: res.data.description,
        price: res.data.price,
        tags: res.data.tags,
      }));

      setPreorders(res.data.preorders);
    }
  }, [res.data]);

  const [isLoading, setIsLoading] = useState(false);

  const [errors, post, resetErrors] = usePost(
    {
      menu: {
        ...fields,
        new_preorders: fields.new_preorders.map((p) => removeStatusAndId(p)),
        edited_preorders: fields.edited_preorders.map((p) => removeStatus(p)),
      },
    },
    {
      name: undefined,
      description: undefined,
      price: undefined,
    },
    `/api/v1/your_restaurant/menus/${id}`,
    "PATCH",
    imageBlob
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await post();
    if (res) {
      dispatch(openSuccessSnackBar("Menu updated!"));
      history.push(`/menu/${res.data.id}`);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <RenderResponse {...res}>
      {(data) => (
        <>
          <MenuForm
            fields={fields}
            preorders={preorders}
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
        </>
      )}
    </RenderResponse>
  );
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
