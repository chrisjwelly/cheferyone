import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import LoadingCenter from "../components/LoadingCenter";
import OrderCard from "../components/OrderCard";
import { useGet } from "../utils/rest-utils";
import OrdersChangeStatusButtons from "../components/OrdersChangeStatusButtons";

const PREVIEW_LENGTH = 2;

const useStyles = makeStyles({
  buttonContainer: {
    textAlign: "center",
  },
});

export default function RestaurantOrders() {
  const { isLoading: isPaidLoading, data: paidData } = useGet(
    "/api/v1/your_restaurant/orders/paid"
  );
  const { isLoading: isConfirmedLoading, data: confirmedData } = useGet(
    "/api/v1/your_restaurant/orders/confirmed"
  );
  const { isLoading: isCompletedLoading, data: completedData } = useGet(
    "/api/v1/your_restaurant/orders/completed"
  );

  if (isPaidLoading || isConfirmedLoading || isCompletedLoading) {
    return <LoadingCenter />;
  } else {
    return (
      <div>
        <Typography variant="h6">Paid</Typography>
        {paidData.slice(0, PREVIEW_LENGTH).map((order, i) => (
          <OrderCard order={order} key={i}>
            <OrdersChangeStatusButtons
              order={order}
              dest="/your-restaurant/orders"
              isToConfirm
            />
          </OrderCard>
        ))}
        {paidData.length === 0 ? (
          <Typography variant="caption" color="textSecondary">
            It seems a little lonely here...
          </Typography>
        ) : (
          <SeeAllButton to="/your-restaurant/orders/paid" />
        )}

        <Typography variant="h6">Confirmed</Typography>
        {confirmedData.slice(0, PREVIEW_LENGTH).map((order, i) => (
          <OrderCard order={order} key={i}>
            <OrdersChangeStatusButtons
              order={order}
              dest="/your-restaurant/orders"
            />
          </OrderCard>
        ))}
        {completedData.length === 0 ? (
          <Typography variant="caption" color="textSecondary">
            It seems a little lonely here...
          </Typography>
        ) : (
          <SeeAllButton to="/your-restaurant/orders/confirmed" />
        )}

        <Typography variant="h6">Completed</Typography>
        {completedData.slice(0, PREVIEW_LENGTH).map((order, i) => (
          <OrderCard order={order} key={i} />
        ))}
        {completedData.length === 0 ? (
          <Typography variant="caption" color="textSecondary">
            It seems a little lonely here...
          </Typography>
        ) : (
          <SeeAllButton to="/your-restaurant/orders/completed" />
        )}
      </div>
    );
  }
}

function SeeAllButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <Button component={Link} {...props} color="secondary">
        See All
      </Button>
    </div>
  );
}
