import { SET_LOCATION } from "./types";
import { openWarningSnackBar } from "./snackbar-actions";

const NO_LOCATION_MESSAGE =
  'Location cannot be detected. Some features like "Near You" will not work at full capability';

export const getLocation = () => (dispatch) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat, lng };

        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK") {
            // has place result
            if (results[0]) {
              dispatch(
                setLocation({
                  name: results[0].formatted_address,
                  lat,
                  lng,
                })
              );
            } else {
              // No place result
              dispatch(
                setLocation({
                  name: null,
                  lat,
                  lng,
                })
              );
            }
          } else {
            // Get place result error
            dispatch(
              setLocation({
                name: null,
                lat,
                lng,
              })
            );
          }
        });
      },
      () => {
        // If denied permission or some other error
        dispatch(openWarningSnackBar(NO_LOCATION_MESSAGE));
        dispatch(setLocation(false));
      }
    );
  } else {
    // If location is not supported
    dispatch(openWarningSnackBar(NO_LOCATION_MESSAGE));
    dispatch(setLocation(false));
  }
};

export const setLocation = (locationObj) => {
  if (locationObj) {
    return {
      type: SET_LOCATION,
      payload: {
        name: locationObj.name,
        lat: locationObj.lat,
        lng: locationObj.lng,
      },
    };
  } else {
    return {
      type: SET_LOCATION,
      payload: locationObj,
    };
  }
};
