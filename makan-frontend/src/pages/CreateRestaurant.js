import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import RestaurantForm from "../components/RestaurantForm";
import { openSuccessSnackBar } from "../actions/snackbar-actions";
import { usePost } from "../utils/rest-utils";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
}));

export default function CreateRestaurant() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const [fields, setFields] = useState({
    location: "",
    description: "",
  });

  const [errors, post, resetErrors] = usePost(
    { restaurant: fields },
    {
      location: undefined,
      description: undefined,
    },
    `/api/v1/your_restaurant`,
    "POST",
    imageBlob
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await post();
    if (res) {
      dispatch(openSuccessSnackBar("Restaurant created!"));

      window.location.reload();
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className={classes.headerContainer}>
        <Typography variant="h6" color="textSecondary">
          With this app, anyone can create their dream restaurant.
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Including you.
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Start your journey today!
        </Typography>
      </div>
      <RestaurantForm
        fields={fields}
        setFields={(fields) => {
          resetErrors();
          setFields(fields);
        }}
        setImageBlob={setImageBlob}
        errors={errors}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  );
}
