import React from "react";
import _ from "lodash";
import Button from "@material-ui/core/Button";

import store from "../store";
import { openDialog, closeDialog } from "../actions/dialog-actions";
import { openErrorSnackBar } from "../actions/snackbar-actions";

export function stringToMoney(s) {
  if (typeof s !== "number") {
    return Number(s).toFixed(2);
  } else {
    return s.toFixed(2);
  }
}

export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function getLatLngFromPlace(place, lat, lng, setError) {
  const onError = () => {
    store.dispatch(
      openErrorSnackBar(
        "Location is invalid. Please select a location from the dropdown!"
      )
    );
    setError();
  };

  if (place && _.isObject(place) && "place_id" in place) {
    return new Promise((resolve, _) =>
      new window.google.maps.Geocoder().geocode(
        { placeId: place.place_id },
        (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              resolve({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              });
            } else {
              store.dispatch(
                openDialog(
                  "Warning",
                  "Coordinates cannot be found for current location. Proceeding will affect discovery of your restaurant. It is recommended that you choose another location.",
                  <Button
                    color="primary"
                    onClick={() => {
                      resolve({
                        lat: "1.3139843",
                        lng: "103.5640535",
                      });
                      store.dispatch(closeDialog());
                    }}
                  >
                    Ok
                  </Button>
                )
              );
            }
          } else {
            onError();
          }
        }
      )
    );
  } else if (place && lat && lng && lat !== "" && lng !== "") {
    return {
      lat,
      lng,
    };
  } else {
    onError();
  }
}
