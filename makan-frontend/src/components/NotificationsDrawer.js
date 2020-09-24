import React, { useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { createConsumer } from "@rails/actioncable";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { format } from "date-fns";

import { setDrawerState } from "../actions/notification-actions";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.breakpoints.values.sm,
    [theme.breakpoints.down("sm")]: {
      width: theme.breakpoints.values.sm / 2,
    },
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  root: { zIndex: theme.zIndex.modal },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(1),
  },
  notification: {
    padding: theme.spacing(1, 0, 1, 0),
  },
  date: {
    marginRight: theme.spacing(1),
  },
}));

export default function NotificationsDrawer() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const authToken = useSelector(
    (store) => store.auth.user.authentication_token
  );
  const isOpen = useSelector((store) => store.notification.isOpen);
  const [consumer, setConsumer] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (authToken && !consumer) {
      const currConsumer = createConsumer(getWebSocketUrl(authToken));
      setConsumer(currConsumer);
      currConsumer.subscriptions.create(
        { channel: "NotificationsChannel" },
        {
          received(data) {
            console.log(data);
            setNotifications((notifications) => [data, ...notifications]);
          },
        }
      );
    }
  }, [authToken, consumer]);

  console.log(notifications);

  return (
    <Drawer
      classes={{ paper: classes.drawer, root: classes.root }}
      anchor="right"
      open={isOpen}
      onClose={() => dispatch(setDrawerState(false))}
    >
      {notifications.length === 0 ? (
        <Typography variant="caption">
          No notifications yet. It seems a little lonely here...
        </Typography>
      ) : (
        notifications.map(
          ({ content, image_url, redirect_url, created_at }, i) => (
            <CurrentNotification
              key={i}
              content={content}
              image_url={image_url}
              redirect_url={redirect_url}
              created_at={created_at}
            />
          )
        )
      )}
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

function CurrentNotification({ content, image_url, redirect_url, created_at }) {
  console.log(created_at);
  const classes = useStyles();
  return (
    <Card className={classes.notification}>
      <Grid container justify="flex-end">
        <Grid item>
          <Typography variant="caption" className={classes.date}>
            {format(new Date(created_at), "dd/MM/yy")}
          </Typography>
        </Grid>
      </Grid>
      <Grid container wrap="nowrap" alignItems="center">
        <Grid item>
          <Avatar className={classes.avatar} variant="square" src={image_url} />
        </Grid>
        <Grid item>
          <Typography variant="caption">{content}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
