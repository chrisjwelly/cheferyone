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
      history.goBack();
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
