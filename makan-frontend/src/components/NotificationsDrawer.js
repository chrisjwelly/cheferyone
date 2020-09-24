import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({ drawer: { width: 240 } });

export default function NotificationsDrawer() {
  const classes = useStyles();

  return (
    <Drawer classes={{ paper: classes.drawer }} anchor="right" >
      Test
    </Drawer>
  );
}
