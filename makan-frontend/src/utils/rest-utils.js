import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import useSWR, { useSWRInfinite } from "swr";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import { PAGE_SIZE } from "../constants";
import storage from "./firebase-storage";
import { notEmpty } from "./validators";
import { openErrorSnackBar } from "../actions/snackbar-actions";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useGet(url) {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    isLoading: !data && !error,
    error,
    isUnauthorized: error && error.response && error.response.status === 401,
    isForbidden: error && error.response && error.response.status === 403,
    isNotFound: error && error.response && error.response.status === 404,
  };
}

export function useInfinite(url) {
  const { data, size, setSize, error } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) {
        return null;
      }
      return `${url}?limit=${PAGE_SIZE}&offset=${pageIndex * PAGE_SIZE}`;
    },
    fetcher
  );

  const isEmpty = data && data[0] && data.length === 0;
  const isEnd =
    isEmpty ||
    (data && data[data.length - 1] && data[data.length - 1].length < PAGE_SIZE);

  const isLoadingInitialData = !data && !error;
  const isLoadingNextPage =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  return {
    data,
    isLoading: !data && !error,
    error,
    isUnauthorized: error && error.response && error.response.status === 401,
    isForbidden: error && error.response && error.response.status === 403,
    isNotFound: error && error.response && error.response.status === 404,
    isLoadingNextPage,
    isEnd,
    loadNextPage: () => setSize(size + 1),
  };
}

export async function uploadImage(imageBlob) {
  // Basic client side checks, should be done for server side too!
  if (imageBlob.size >= 5 * 1024 * 1024) {
    return { hasErrors: true, payload: "Image uploaded should not exceed 5MB" };
  }
  if (!/image\/.*/g.test(imageBlob.type)) {
    return { hasErrors: true, payload: "Make sure you uploaded a valid image" };
  }

  try {
    const snapshot = await storage
      .child(uuidv4() + imageBlob.name)
      .put(imageBlob);
    const image_url = await snapshot.ref.getDownloadURL();
    return { hasErrors: false, payload: image_url };
  } catch {
    return {
      hasErrors: true,
      payload: "There was a problem uploading the picture, please try again",
    };
  }
}

export function usePost(dataToPost, fieldsToValidate, path) {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const post = async () => {
    const err = findErrors(dataToPost, fieldsToValidate);
    setErrors(err);
    if (!_.isEmpty(err)) {
      dispatch(openErrorSnackBar(parseErrors(err)));
      return false;
    }
    try {
      const res = await axios.post(path, JSON.stringify(dataToPost));
      return res;
    } catch {
      const err = {
        unknown: "Action failed, please try again",
      };
      setErrors(err);
      dispatch(openErrorSnackBar(parseErrors(err)));
      return false;
    }
  };

  const resetErrors = () => setErrors({});
  return [errors, post, resetErrors];
}

function findErrors(data, fieldsToValidate) {
  let errors = {};

  _.forEach(data, (value, key) => {
    if (key in fieldsToValidate) {
      const validity = isValid(value, fieldsToValidate[key]);
      if (!validity.isValid) {
        errors = { ...errors, [key]: validity.message };
      }
    } else if (
      _.isObject(value) &&
      !_.isFunction(value) &&
      value !== undefined
    ) {
      errors = {
        ...errors,
        ...findErrors(data[key], fieldsToValidate),
      };
    }
  });

  return errors;
}

function isValid(fieldValue, validator) {
  if (validator === undefined) {
    // check if is empty
    return notEmpty(fieldValue);
  }

  return validator(fieldValue);
}

function parseErrors(err) {
  let result = [];
  for (const key in err) {
    result.push(
      <p key={key}>{(key !== "unknown" ? key + ": " : "") + err[key]}</p>
    );
  }

  return result;
}
