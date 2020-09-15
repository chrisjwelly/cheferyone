import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import { setTabIndex } from "../actions/bottombar-actions";
import MenuHeader from "../components/MenuHeader";
import MenuDetails from "../components/MenuDetails";
import MenuOrderDrawer from "../components/MenuOrderDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "40px",
  },
  buttonContainer: {
    textAlign: "center",
    position: "fixed",
    bottom: "70px",
    right: 0,
    left: 0,
    marginRight: "auto",
    marginLeft: "auto",
  },
  button: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
    color: theme.palette.common.white,
  },
}));

export default function Menu() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabIndex(0));
  }, [dispatch]);
  const classes = useStyles();

  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <div className={classes.root}>
      <MenuHeader
        name="Nsai Kang KangNsai Kang KangNsai Kang KangNsai Kang KangNsai Kang KangNsai Kang KangNsai Kang Kang"
        homecook="Soo Yuen Jien"
        image="/logan.jpg"
        rating="3.2"
      />
      <MenuDetails
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus risus ac facilisis iaculis. Sed vehicula, est non facilisis interdum, eros dui ultrices sapien, ac imperdiet nisl nunc vel lectus. Nulla sit amet lacus vitae justo malesuada cursus et vel odio. Donec libero ante, placerat ac massa eget, feugiat pellentesque odio. Integer suscipit augue at cursus pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus pellentesque sollicitudin. Mauris vitae felis nunc. Vivamus vitae sem orci. Nunc vel rutrum eros. In sodales lacus at libero consectetur laoreet. Nulla accumsan laoreet ipsum. Sed interdum semper ipsum non euismod. Duis porttitor mauris mi, nec accumsan turpis elementum et. Morbi ultrices sapien a tortor pretium luctus. Duis ultrices commodo placerat. Nam sed erat bibendum, feugiat leo a, mattis leo. Vestibulum mi mauris, rutrum non fringilla eget, cursus sit amet dui. Suspendisse potenti. Mauris condimentum, risus nec mattis sagittis, nunc lorem hendrerit quam, in cursus ex quam ac turpis. In mattis eu sapien id dignissim. In vitae molestie risus. Ut ipsum ipsum, laoreet vel augue quis, sagittis fringilla neque. Suspendisse vehicula diam ut neque bibendum lacinia sit amet nec velit. Sed semper porttitor leo, eget scelerisque justo laoreet et. Fusce quis consequat nisl, sed interdum odio. Sed blandit faucibus diam. Nullam tincidunt purus quis dui ornare scelerisque. Pellentesque placerat volutpat diam. Vivamus ante elit, fermentum nec sagittis in, tempor non arcu. Curabitur convallis, dolor sit amet molestie auctor, metus leo sollicitudin lacus, quis cursus mauris eros non massa. Vestibulum interdum sapien luctus lacus ornare fringilla. Nullam et nibh quis urna ultrices sodales facilisis eget lectus."
        price="10"
      />
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => setIsOrderOpen(true)}
        >
          Order Now!
        </Button>
      </div>
      <MenuOrderDrawer
        open={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        name="Nsai Kang KangNsai Kang KangNsai Kang KangNsai Kang KangNsai Kang KangNsai Kang KangNsai Kang Kang"
        image="/logan.jpg"
        price="10"
        deliveryFee="3"
        deliveryDate="26th September 2020 9:00AM to 5:00PM"
      />
    </div>
  );
}
