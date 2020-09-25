import React, { useEffect, useState, useCallback } from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { createConsumer } from "@rails/actioncable";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

import InfiniteScroll from "../components/InfiniteScroll";
import AvatarCors from "./AvatarCors";
import {
  setDrawerState,
  setUnreadNotifications,
} from "../actions/notification-actions";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.breakpoints.values.sm,
    [theme.breakpoints.down("sm")]: {
      width: theme.breakpoints.values.sm / 2.5,
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
    marginBottom: theme.spacing(2),
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
          received: (data) => {
            setNotifications((notifications) => [data, ...notifications]);
          },
        }
      );
    }
  }, [authToken, consumer, dispatch]);

  const renderCards = (notification, i) => {
    return (
      <CurrentNotification
        key={i}
        content={notification.content}
        image_url={notification.object.image_url}
        redirect_url={notification.object.redirect_url}
        created_at={notification.object.created_at}
      />
    );
  };

  return (
    <Drawer
      classes={{ paper: classes.drawer, root: classes.root }}
      anchor="right"
      open={isOpen}
      onClose={() => dispatch(setDrawerState(false))}
    >
      <div>
        {notifications.map(renderCards)}
        <InfiniteScroll
          apiPath="/api/v1/notifications"
          offset={notifications.length}
        >
          {(data) => data.map((page) => page.map(renderCards))}
        </InfiniteScroll>
      </div>
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
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Card
      className={classes.notification}
      onClick={() => {
        dispatch(setDrawerState(false));
        history.push(redirect_url);
      }}
    >
      <Grid container justify="flex-end">
        <Grid item>
          <Typography variant="caption" className={classes.date}>
            {format(new Date(created_at), "dd/MM/yy")}
          </Typography>
        </Grid>
      </Grid>
      <Grid container wrap="nowrap" alignItems="center">
        <Grid item>
          <AvatarCors
            className={classes.avatar}
            variant="square"
            src={image_url}
          />
        </Grid>
        <Grid item>
          <Typography variant="caption">{content}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
