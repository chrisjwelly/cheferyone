import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { Link } from "react-router-dom";

import MenuCard from "../components/MenuCard";
import SuggestionsSectionContainer from "../components/SuggestionsSectionContainer";
import LoadingCenter from "../components/LoadingCenter";
import { setTabIndex } from "../actions/bottombar-actions";
import { useGet } from "../utils/rest-utils";
import { NUMBER_OF_SUGGESTIONS } from "../constants";
import Offline from "../pages/Offline";
import Error from "../pages/Error";

const useStyles = makeStyles((theme) => ({
  signInContainer: {
    height: "100vh",
  },
  loginButton: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
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

  if (_.isEmpty(currUser)) {
    return <NotAuthenticated />;
  } else {
    return <Authenticated />;
  }
}

function Authenticated() {
  const recommended = useGet(
    `/api/v1/menus/recommended?limit=${NUMBER_OF_SUGGESTIONS}&offset=0`
  );
  const nearby = useGet(
    `/api/v1/menus/near_you?limit=${NUMBER_OF_SUGGESTIONS}&offset=0`
  );
  const recent = useGet(
    `/api/v1/menus/recent?limit=${NUMBER_OF_SUGGESTIONS}&offset=0`
  );

  if (recommended.isLoading || nearby.isLoading || recent.isLoading) {
    return <LoadingCenter />;
  } else if (
    (recommended.error || nearby.error || recent.error) &&
    !navigator.onLine
  ) {
    // placeholder
    // Improve when we have more advanced offline features
    return <Offline />;
  } else if (recommended.error || nearby.error || recent.error) {
    return <Error />;
  } else {
    return (
      <>
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
        <SuggestionsSectionContainer title="Near You" seeMorePath="/nearby">
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
      </>
    );
  }
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          classes={{ root: classes.loginButton }}
          component={Link}
          to="/login"
        >
          Login
        </Button>
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
