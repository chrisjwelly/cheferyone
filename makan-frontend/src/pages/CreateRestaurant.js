import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import RestaurantForm from "../components/RestaurantForm";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
}));

export default function CreateRestaurant() {
  const classes = useStyles();

  const [imageBlob, setImageBlob] = useState(null);
  const [fields, setFields] = useState({
    location: null,
    latitude: "",
    longitude: "",
    description: "",
    tags: [],
  });

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
        setFields={setFields}
        imageBlob={imageBlob}
        setImageBlob={setImageBlob}
      />
    </div>
  );
}
