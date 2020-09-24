import axios from "axios";

import store from "../store";
import {
  openErrorSnackBar,
  openSuccessSnackBar,
} from "../actions/snackbar-actions";

export function saveRequest(request) {
  let cachedRequests = [];

  if (localStorage.getItem("requests")) {
    cachedRequests = JSON.parse(localStorage.getItem("requests"));
  }

  localStorage.setItem(
    "requests",
    JSON.stringify([...cachedRequests, request])
  );
}

export function runRequests() {
  const cachedRequests = localStorage.getItem("requests");

  if (cachedRequests) {
    const requestPromises = JSON.parse(cachedRequests).map((request) =>
      axios(request)
    );

    Promise.all(requestPromises)
      .then(() => {
        store.dispatch(
          openSuccessSnackBar("All postings made offline has been submitted")
        );
      })
      .catch(() =>
        store.dispatch(
          openErrorSnackBar("Some postings made offline could not be completed")
        )
      )
      .finally(() => {
        localStorage.removeItem("requests");
      });
  }
}
