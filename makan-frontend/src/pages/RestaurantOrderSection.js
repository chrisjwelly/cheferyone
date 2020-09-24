import React from "react";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";

import { useGet } from "../utils/rest-utils";
import LoadingCenter from "../components/LoadingCenter";
import OrderCard from "../components/OrderCard";
import OrdersChangeStatusButtons from "../components/OrdersChangeStatusButtons";
import { uppercaseFirst } from "../utils/general";

export default function RestaurantOrdersSection() {
  const { id } = useParams();
  const { isLoading, data } = useGet(`/api/v1//your_restaurant/orders/${id}`);

  if (isLoading) {
    return <LoadingCenter />;
  } else if (data.length === 0) {
    return (
      <Typography variant="caption" color="textSecondary">
        No orders in this section. Start selling some food!
      </Typography>
    );
  } else {
    return (
      <div>
        <Typography variant="h6">{uppercaseFirst(id)}</Typography>
        {[...data].reverse().map((order, i) => (
          <OrderCard order={order} key={i}>
            {id === "paid" ||
              (id === "confirmed" && (
                <OrdersChangeStatusButtons
                  order={order}
                  isToConfirm={id === "paid"}
                  dest={`/your-restaurant/orders/${id}`}
                />
              ))}
          </OrderCard>
        ))}
      </div>
    );
  }
}
