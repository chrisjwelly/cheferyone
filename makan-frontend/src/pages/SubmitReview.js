import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import {
  openSuccessSnackBar,
  openErrorSnackBar,
} from "../actions/snackbar-actions";
import { useGet, usePost } from "../utils/rest-utils";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import { useParams, useHistory } from "react-router-dom";
import clsx from "clsx";
import ReactGA from "react-ga";

import LoadingButton from "../components/LoadingButton";
import CancelButton from "../components/CancelButton";
import LoadingCenter from "../components/LoadingCenter";
import { setTabIndex } from "../actions/bottombar-actions";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  reviewError: {
    borderStyle: "solid",
    borderColor: "red",
  },
}));

export default function SubmitReview() {
  const { id: orderId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    content: "",
    rating: 0,
  });

  const { isLoading: isOrderLoading, data: orderData } = useGet(
    `/api/v1/orders/${orderId}`
  );
  const {
    data: reviewData,
    error: reviewError,
    isLoading: isReviewLoading,
  } = useGet(`/api/v1/orders/${orderId}/review`, null, null, true);
  const [submitType, setSubmitType] = useState("POST");

  useEffect(() => {
    dispatch(setTabIndex(2));
  }, [dispatch]);

  useEffect(() => {
    // Redirect if order is not completed
    if (orderData && orderData.status !== "completed") {
      dispatch(openErrorSnackBar("Not allowed to add a review for this item!"));
      history.push("/");
    }
  }, [orderData, dispatch, history]);

  useEffect(() => {
    // Fill up form if editing
    if (reviewData) {
      setFields({
        content: reviewData.content,
        rating: reviewData.rating,
      });
      setSubmitType("PATCH");
    }
  }, [reviewData, dispatch, history]);

  const { errors, post, resetErrors } = usePost();

  const onSubmit = async (e) => {
    ReactGA.event({
      category: "Submitting a Review",
      action: "User is submitting a review",
    })
    e.preventDefault();
    setIsLoading(true);

    const res = await post(
      {
        review: {
          ...fields,
        },
      },
      `/api/v1/orders/${orderId}/review`,
      submitType
    );
    if (res) {
      dispatch(openSuccessSnackBar("Review posted!"));
      history.goBack();
    } else {
      setIsLoading(false);
    }
  };

  if (isOrderLoading || (!reviewError && isReviewLoading)) {
    return <LoadingCenter />;
  }
  return (
    <form noValidate onSubmit={onSubmit}>
      <Grid container spacing={2} className={classes.creationTextContainer}>
        <Grid item xs={12}>
          <Typography component="legend">Rating:</Typography>
          <Rating
            className={clsx(errors.rating && classes.reviewError)}
            name="rating"
            value={fields.rating}
            size="large"
            onChange={(_, newValue) => {
              resetErrors();
              setFields({
                ...fields,
                rating: newValue,
              });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="review"
            error={errors.content !== undefined}
            label="Review"
            multiline
            rows={4}
            value={fields.content}
            onChange={(e) => {
              resetErrors();
              setFields({
                ...fields,
                content: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            isLoading={isLoading}
          >
            Submit
          </LoadingButton>
        </Grid>
        <Grid item xs={12}>
          <CancelButton
            description="Any unsaved changes will be lost"
            header="Cancel Reviewing?"
            fullWidth
          >
            Cancel
          </CancelButton>
        </Grid>
      </Grid>
    </form>
  );
}
