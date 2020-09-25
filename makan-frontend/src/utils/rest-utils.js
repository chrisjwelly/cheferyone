import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import useSWR, { useSWRInfinite } from "swr";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";
import { useHistory } from "react-router-dom";

import { PAGE_SIZE } from "../constants";
import storage from "./firebase-storage";
import {
  openWarningSnackBar,
  openErrorSnackBar,
} from "../actions/snackbar-actions";
import { saveRequest } from "../utils/offline-utils";
import { uppercaseFirst } from "../utils/general";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function displayMessage(
  error,
  history,
  dispatch,
  skipUnauthorized = false,
  skipForbidden = false,
  skipNotFound = false,
  skipOffline = false
) {
  const isUnauthorized =
    error &&
    error.response &&
    error.response.status === 401 &&
    !skipUnauthorized;
  const isForbidden =
    error && error.response && error.response.status === 403 && !skipForbidden;
  const isNotFound =
    error && error.response && error.response.status === 404 && !skipNotFound;
  const isOffline = error && !navigator.onLine && !skipOffline;

  if (isUnauthorized) {
    // Not logged in
    // Implement history for redirects next time
    dispatch(
      openWarningSnackBar("You need to login before accessing this page")
    );
    history.push("/login");
  } else if (isForbidden) {
    dispatch(
      openErrorSnackBar("You do not have the permissions to access this page")
    );

    history.push("/");
  } else if (isNotFound) {
    history.push("/404");
  } else if (isOffline) {
    dispatch(
      openWarningSnackBar(
        "You are currently offline. Offline functionality may be limited"
      )
    );
  } else if (
    error &&
    error.response &&
    error.response.status !== 401 &&
    error.response.status !== 403 &&
    error.response.status !== 404
  ) {
    dispatch(
      openErrorSnackBar("An unknown error occurred. Please try again later")
    );
  }
}

export function useGet(
  url,
  skipUnauthorized,
  skipForbidden,
  skipNotFound,
  skipOffline
) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { data, error } = useSWR(url, fetcher);

  displayMessage(
    error,
    history,
    dispatch,
    skipUnauthorized,
    skipForbidden,
    skipNotFound,
    skipOffline
  );

  return {
    data,
    isLoading: !data,
    error,
  };
}

export function useInfinite(url, offset = 0) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { data, size, setSize, error } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) {
        return null;
      }
      return `${url}?limit=${PAGE_SIZE}&offset=${
        pageIndex * PAGE_SIZE + offset
      }`;
    },
    fetcher
  );

  displayMessage(error, history, dispatch);

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
    isLoading: !data,
    isLoadingNextPage,
    isEnd,
    loadNextPage: () => setSize(size + 1),
  };
}

export function usePost() {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const post = async (
    dataToPost,
    path,
    method,
    imageBlob = null,
    isSaveOffline = true,
    displayErrorKeys = false
  ) => {
    if (
      offlineHandler(
        isSaveOffline,
        imageBlob,
        method,
        path,
        dataToPost,
        dispatch,
        history
      )
    ) {
      // Stop execution if request has been saved offline
      return "offline";
    }

    let err = {};

    if (imageBlob) {
      if (imageBlob.size >= 5 * 1024 * 1024) {
        err.image = "Image uploaded should not exceed 5MB";
      } else if (!/image\/.*/g.test(imageBlob.type)) {
        err.image = "Make sure you uploaded a valid image";
      }
    }
    setErrors(err);

    if (imageBlob && !isEmpty(err)) {
      // Show image errors
      dispatch(openErrorSnackBar(parseErrors(err)));
      return false;
    }

    try {
      if (imageBlob) {
        const snapshot = await storage
          .child(uuidv4() + imageBlob.name)
          .put(imageBlob);
        const image_url = await snapshot.ref.getDownloadURL();

        if (dataToPost.menu) {
          dataToPost.menu.image_url = image_url;
        } else if (dataToPost.restaurant) {
          dataToPost.restaurant.image_url = image_url;
        }
      }

      const res = await axios({
        method,
        url: path,
        data: JSON.stringify(dataToPost),
      });

      return res;
    } catch (e) {
      const err = e.response.data;
      if (isObject(err) && "errors" in err) {
        setErrors(err.errors);
      } else {
        setErrors(err);
      }
      dispatch(openErrorSnackBar(parseErrors(err, displayErrorKeys)));
      return false;
    }
  };

  const resetErrors = () => setErrors({});
  return { errors, post, resetErrors };
}

function parseErrors(err, displayErrorKeys = false) {
  if (isObject(err) && "errors" in err) {
    let result = [];

    if (!displayErrorKeys) {
      for (const key in err.errors) {
        result.push(<p key={key}>{err.errors[key].join(", ")}</p>);
      }
    } else {
      for (const key in err.errors) {
        result.push(
          <p key={key}>
            {uppercaseFirst(key).replace("_", " ") +
              ": " +
              err.errors[key].join(", ")}
          </p>
        );
      }
    }
    return result;
  } else {
    return <p>An error has occurred, please try again</p>;
  }
}

function offlineHandler(
  isSaveOffline,
  imageBlob,
  method,
  path,
  data,
  dispatch,
  history
) {
  if (!navigator.onLine && isSaveOffline && !imageBlob) {
    saveRequest({
      method,
      url: path,
      data: JSON.stringify(data),
    });

    dispatch(
      openWarningSnackBar(
        "No network detected, operation will be completed when device is connected to the internet"
      )
    );
    history.goBack();

    return true;
  } else if (!navigator.onLine) {
    console.log("here");
    dispatch(openErrorSnackBar("No internet connection!"));
    return true;
  }

  return false;
}
