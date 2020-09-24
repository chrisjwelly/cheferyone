import React, { useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { createConsumer } from "@rails/actioncable";

const useStyles = makeStyles((theme) => ({
  drawer: { width: 240 },
  root: { zIndex: theme.zIndex.modal },
}));

export default function NotificationsDrawer() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const authToken = useSelector(
    (store) => store.auth.user.authentication_token
  );

  const [consumer, setConsumer] = useState(null);

  useEffect(() => {
    if (authToken && !consumer) {
      const currConsumer = createConsumer(getWebSocketUrl(authToken));
      setConsumer(currConsumer);
      currConsumer.subscriptions.create(
        { channel: "NotificationsChannel" },
        {
          received(data) {
            console.log(data);
          },
        }
      );
    }
  }, [authToken, consumer]);

  return (
    <Drawer
      classes={{ paper: classes.drawer, root: classes.root }}
      anchor="right"
    >
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

function CurrentNotification() {}
