import React, { useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import consumer from "../utils/consumer";

const useStyles = makeStyles({ drawer: { width: 240 } });

export default function NotificationsDrawer() {
  const classes = useStyles();
  const authToken = useSelector(
    (store) => store.auth.user.authentication_token
  );

  useEffect(() => {
    if (authToken) {
      consumer.subscriptions.create(
        { channel: "NotificationsChannel" },
        {
          received(data) {
            console.log(data);
          },
        }
      );
    }
  }, [authToken]);

  return (
    <Drawer classes={{ paper: classes.drawer }} anchor="right">
      Test
    </Drawer>
  );
}

function getWebSocketUrl(authToken) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return `ws://localhost:3000/cable?token=${authToken}`;
  } else {
    return `wss://cheferyone.herokuapp.com/cable?token=${authToken}`;
  }
}
