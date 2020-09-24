import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import isEmpty from "lodash/isEmpty";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setTabIndex } from "../../actions/bottombar-actions";
import { openDialog, closeDialog } from "../../actions/dialog-actions";
import { useGet, usePost } from "../../utils/rest-utils";
import LoadingCenter from "../../components/LoadingCenter";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Payment details", "Review your order"];

function getStepContent(step, data) {
  switch (step) {
    case 0:
      return <PaymentForm />;
    case 1:
      return <Review data={data} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const history = useHistory();
  const { post } = usePost();
  const { isLoading, data } = useGet("/api/v1/cart");
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 1) {
      post({}, "/api/v1/cart/pay", "POST");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (!isLoading && isEmpty(data)) {
      history.push("/");
    } else if (!isLoading && !isEmpty(data)) {
      dispatch(
        openDialog(
          "Note",
          "Note that this form is just a mockup and does not actually work. Do not submit actual credit card numbers!",
          <Button color="primary" onClick={() => dispatch(closeDialog())}>
            Ok
          </Button>
        )
      );
    }
  }, [dispatch, history, data, isLoading]);

  useEffect(() => {
    dispatch(setTabIndex(2));
  }, [dispatch]);

  if (isLoading) {
    return <LoadingCenter />;
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order can be found in the "Paid" tab of the "Orders"
                  section.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, data)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
