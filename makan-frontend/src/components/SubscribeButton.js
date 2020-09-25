import React, { useState, useEffect } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";

import { useGet, usePost } from "../utils/rest-utils";
import GreenButton from "./GreenButton";
import RedButton from "./RedButton";

export default function SubscribeButton({ chefName, menuId, ...rest }) {
  const { data } = useGet(
    `/api/v1/${chefName ? "chefs" : "menus"}/${
      chefName || menuId
    }/is_subscribed`,
    true
  );

  const { post } = usePost();

  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (data && data.is_subscribed) {
      setIsSubscribed(true);
    }
  }, [data]);

  const unsubChef = async () => {
    const res = await post({}, `/api/v1/chefs/${chefName}/unsubscribe`, "POST");

    if (res && res !== "offline") {
      setIsSubscribed(false);
    }
  };
  const subChef = async () => {
    const res = await post({}, `/api/v1/chefs/${chefName}/subscribe`, "POST");

    if (res && res !== "offline") {
      setIsSubscribed(true);
    }
  };
  const unsubMenu = async () => {
    const res = await post({}, `/api/v1/menus/${menuId}/unsubscribe`, "POST");

    if (res && res !== "offline") {
      setIsSubscribed(false);
    }
  };
  const subMenu = async () => {
    const res = await post({}, `/api/v1/menus/${menuId}/subscribe`, "POST");

    if (res && res !== "offline") {
      setIsSubscribed(true);
    }
  };

  if (chefName && isSubscribed) {
    return (
      <RedButton
        {...rest}
        variant="contained"
        startIcon={<NotificationsOffIcon />}
        onClick={unsubChef}
      >
        Unsubscribe
      </RedButton>
    );
  } else if (chefName && !isSubscribed) {
    return (
      <GreenButton
        {...rest}
        variant="contained"
        startIcon={<NotificationsIcon />}
        onClick={subChef}
      >
        Subscribe
      </GreenButton>
    );
  } else if (menuId && isSubscribed) {
    return (
      <RedButton
        {...rest}
        variant="contained"
        startIcon={<NotificationsOffIcon />}
        onClick={unsubMenu}
      >
        Unsubscribe
      </RedButton>
    );
  } else if (menuId && !isSubscribed) {
    return (
      <GreenButton
        {...rest}
        variant="contained"
        startIcon={<NotificationsIcon />}
        onClick={subMenu}
      >
        Subscribe
      </GreenButton>
    );
  }
}
