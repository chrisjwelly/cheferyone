import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import isEmpty from "lodash/isEmpty";
import { Link } from "react-router-dom";

import MenuCard from "../components/MenuCard";
import SuggestionsSectionContainer from "../components/SuggestionsSectionContainer";
import LoadingCenter from "../components/LoadingCenter";
import { setTabIndex } from "../actions/bottombar-actions";
import { useGet } from "../utils/rest-utils";
import { NUMBER_OF_SUGGESTIONS } from "../constants";
import GreenButton from "../components/GreenButton";

const useStyles = makeStyles((theme) => ({
  signInContainer: {
    height: "100vh",
  },
  buttonContainer: {
    width: theme.breakpoints.values.sm / 3,
  },
}));

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabIndex(0));
  }, [dispatch]);

  const currUser = useSelector((store) => store.auth.user);

  if (isEmpty(currUser)) {
    return <NotAuthenticated />;
  } else {
    return <Authenticated />;
  }
}

function Authenticated() {
  const location = useSelector((store) => store.location);
  const [hasLocationName, setHasLocationName] = useState(
    !!location && !!location.name
  );

  const [nearbyPath, setNearbyPath] = useState(
    `/api/v1/menus/near_you?limit=${NUMBER_OF_SUGGESTIONS}&offset=0`
  );

  useEffect(() => {
    setHasLocationName(!!location && !!location.name);

    if (!!location && navigator.onLine) {
      setNearbyPath(
        `/api/v1/menus/near_you?latitude=${location.lat}&longitude=${location.lng}&limit=${NUMBER_OF_SUGGESTIONS}&offset=0`
      );
    }
  }, [location]);

  const recommended = useGet(
    `/api/v1/menus/recommended?limit=${NUMBER_OF_SUGGESTIONS}&offset=0`
  );
  const nearby = useGet(nearbyPath);
  const recent = useGet(
    `/api/v1/menus/recent?limit=${NUMBER_OF_SUGGESTIONS}&offset=0`
  );

  return (
    <>
      {recommended.isLoading ? (
        <LoadingCenter />
      ) : (
        <SuggestionsSectionContainer
          title="Recommended"
          seeMorePath="/recommended"
        >
          {recommended.data.map((obj, i) => (
            <MenuCard
              key={i}
              price={obj.price}
              rating={obj.rating}
              name={obj.name}
              link={`/menu/${obj.id}`}
              image={obj.image_url}
              tags={obj.tags}
            />
          ))}
        </SuggestionsSectionContainer>
      )}
      {nearby.isLoading ? (
        <LoadingCenter />
      ) : (
        <SuggestionsSectionContainer
          title="Near You"
          seeMorePath="/nearby"
          locationName={!hasLocationName ? undefined : location.name}
          isNearby
        >
          {nearby.data.map((obj, i) => (
            <MenuCard
              key={i}
              price={obj.price}
              rating={obj.rating}
              name={obj.name}
              link={`/menu/${obj.id}`}
              image={obj.image_url}
              tags={obj.tags}
            />
          ))}
        </SuggestionsSectionContainer>
      )}
      {recent.isLoading ? (
        <LoadingCenter />
      ) : (
        <SuggestionsSectionContainer title="New" seeMorePath="/new">
          {recent.data.map((obj, i) => (
            <MenuCard
              key={i}
              price={obj.price}
              rating={obj.rating}
              name={obj.name}
              link={`/menu/${obj.id}`}
              image={obj.image_url}
              tags={obj.tags}
            />
          ))}
        </SuggestionsSectionContainer>
      )}
    </>
  );
}

function NotAuthenticated() {
  const classes = useStyles();

  return (
    <Grid
      className={classes.signInContainer}
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item className={classes.buttonContainer}>
        <GreenButton fullWidth variant="contained" component={Link} to="/login">
          Login
        </GreenButton>
      </Grid>
      <Grid item className={classes.buttonContainer}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
}
