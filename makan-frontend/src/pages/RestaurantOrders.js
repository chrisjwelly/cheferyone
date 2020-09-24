import React from "react";
import Typography from "@material-ui/core/Typography";

import LoadingCenter from "../components/LoadingCenter";
import OrderCard from "../components/OrderCard";
import { useGet } from "../utils/rest-utils";
import OrdersChangeStatusButtons from "../components/OrdersChangeStatusButtons";
import SeeAllButton from "../components/SeeAllButton";

const PREVIEW_LENGTH = 2;

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
  const { isLoading: isEndedLoading, data: endedData } = useGet(
    "/api/v1/your_restaurant/orders/ended"
  );

  if (
    isPaidLoading ||
    isConfirmedLoading ||
    isCompletedLoading ||
    isEndedLoading
  ) {
    return <LoadingCenter />;
  } else {
    return (
      <div>
        <Typography variant="h6">Paid</Typography>
        {paidData
          .reverse()
          .slice(0, PREVIEW_LENGTH)
          .map((order, i) => (
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
            No orders in this section. Start selling some food!
          </Typography>
        ) : (
          <SeeAllButton to="/your-restaurant/orders/paid" />
        )}

        <Typography variant="h6">Confirmed</Typography>
        {confirmedData
          .reverse()
          .slice(0, PREVIEW_LENGTH)
          .map((order, i) => (
            <OrderCard order={order} key={i}>
              <OrdersChangeStatusButtons
                order={order}
                dest="/your-restaurant/orders"
              />
            </OrderCard>
          ))}
        {completedData.length === 0 ? (
          <Typography variant="caption" color="textSecondary">
            No orders in this section. Start selling some food!
          </Typography>
        ) : (
          <SeeAllButton to="/your-restaurant/orders/confirmed" />
        )}

        <Typography variant="h6">Completed</Typography>
        {completedData
          .reverse()
          .slice(0, PREVIEW_LENGTH)
          .map((order, i) => (
            <OrderCard order={order} key={i} />
          ))}
        {completedData.length === 0 ? (
          <Typography variant="caption" color="textSecondary">
            No orders in this section. Start selling some food!
          </Typography>
        ) : (
          <SeeAllButton to="/your-restaurant/orders/completed" />
        )}

        <Typography variant="h6">Ended</Typography>
        {endedData
          .reverse()
          .slice(0, PREVIEW_LENGTH)
          .map((order, i) => (
            <OrderCard order={order} key={i} />
          ))}
        {endedData.length === 0 ? (
          <Typography variant="caption" color="textSecondary">
            No orders in this section. Start selling some food!
          </Typography>
        ) : (
          <SeeAllButton to="/your-restaurant/orders/ended" />
        )}
      </div>
    );
  }
}
