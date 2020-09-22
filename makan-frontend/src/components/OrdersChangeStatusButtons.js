import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { usePost } from "../utils/rest-utils";
import GreenButton from "../components/GreenButton";
import RedButton from "../components/RedButton";
import { openDialog, closeDialog } from "../actions/dialog-actions";
import { openSuccessSnackBar } from "../actions/snackbar-actions";

export default function OrdersChangeStatusButtons({
  order,
  isToConfirm,
  dest,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { post } = usePost();

  const updateStatus = (status, id) => {
    dispatch(
      openDialog(
        `${
          status === "confirmed"
            ? "Confirm"
            : status === "ended"
            ? "End"
            : "Complete"
        } order?`,
        "This action is irreversible!",
        <>
          <Button color="primary" onClick={() => dispatch(closeDialog())}>
            No
          </Button>
          <Button
            color="primary"
            onClick={async () => {
              dispatch(closeDialog());
              const res = await post(
                {
                  order: {
                    status,
                  },
                },
                `/api/v1/your_restaurant/orders/${id}/update_status`,
                "PATCH"
              );

              if (res) {
                dispatch(
                  openSuccessSnackBar(
                    `Order ${
                      status === "confirmed"
                        ? "confirmed"
                        : status === "ended"
                        ? "ended"
                        : "completed"
                    }`
                  )
                );
                history.push("/");
                history.push(dest);
              }
            }}
          >
            Yes
          </Button>
        </>
      )
    );
  };

  const newStatus = isToConfirm ? "confirmed" : "completed";
  const buttonText = isToConfirm ? "Confirm" : "Complete";

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="caption" color="textSecondary">
          Actions:
        </Typography>
      </Grid>
      <Grid item>
        <GreenButton
          size="small"
          onClick={(e) => {
            e.preventDefault();
            updateStatus(newStatus, order.id);
          }}
        >
          <Typography variant="caption">{buttonText}</Typography>
        </GreenButton>
      </Grid>
      {isToConfirm && (
        <Grid item>
          <RedButton
            size="small"
            onClick={(e) => {
              e.preventDefault();
              updateStatus("ended", order.id);
            }}
          >
            <Typography variant="caption">Reject</Typography>
          </RedButton>
        </Grid>
      )}
    </Grid>
  );
}
