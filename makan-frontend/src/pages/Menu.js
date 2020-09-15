import React, { useState, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Drawer from "@material-ui/core/Drawer";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LinesEllipsis from "react-lines-ellipsis";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import RatingStars from "../components/RatingStars";
import NumberInput from "../components/NumberInput";
import MenuHeader from "../components/MenuHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "40px",
  },
  showMoreButtonContainer: {
    textAlign: "center",
  },
  orderNowContainer: {
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
  orderDrawerContent: {
    overflowY: "hidden",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  orderDrawerHeaderContainer: {
    width: "100%",
  },
  orderDrawerThumbnail: {
    objectFit: "cover",
    height: theme.breakpoints.values.sm / 7,
    width: theme.breakpoints.values.sm / 7,
    boxShadow: theme.shadows[1],
  },
  orderDrawerTitle: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  addToCartButtonContainer: {
    textAlign: "center",
  },
}));

export default function Menu() {
  const classes = useStyles();

  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <div className={classes.root}>
      <MenuHeader
        name="Nsai Kang KangNsai Kang KangNsai Kang KangNsai Kang KangNsai Kang KangNsai Kang KangNsai Kang Kang"
        homecook="Soo Yuen Jien"
        image="/logan.jpg"
        rating={3.2}
      />
      <Details />
      <div className={classes.orderNowContainer}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => setIsOrderOpen(true)}
        >
          Order Now!
        </Button>
      </div>
      <OrderDrawer open={isOrderOpen} onClose={() => setIsOrderOpen(false)} />
    </div>
  );
}

function Header() {
  const classes = useStyles();

  return (
    <Grid
      container
      wrap="nowrap"
      alignItems="center"
      className={classes.header}
    >
      <Grid item>
        <img className={classes.thumbnail} src="/logan.jpg" />
      </Grid>
      <Grid item className={classes.headerTextContainer}>
        <Typography variant="h6" component="div">
          <LinesEllipsis
            text="Nasi Kang Kang name is ososososososoosos longlonglonglonglonglong"
            maxLine="2"
            basedOn="letters"
          />
        </Typography>
        <RatingStars size="small" rating={3.2} />
        <Typography variant="caption">Homecook: Soo Yuen Juen</Typography>
      </Grid>
    </Grid>
  );
}

function Details() {
  const classes = useStyles();
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus risus ac facilisis iaculis. Sed vehicula, est non facilisis interdum, eros dui ultrices sapien, ac imperdiet nisl nunc vel lectus. Nulla sit amet lacus vitae justo malesuada cursus et vel odio. Donec libero ante, placerat ac massa eget, feugiat pellentesque odio. Integer suscipit augue at cursus pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus pellentesque sollicitudin. Mauris vitae felis nunc. Vivamus vitae sem orci. Nunc vel rutrum eros. In sodales lacus at libero consectetur laoreet. Nulla accumsan laoreet ipsum. Sed interdum semper ipsum non euismod. Duis porttitor mauris mi, nec accumsan turpis elementum et. Morbi ultrices sapien a tortor pretium luctus. Duis ultrices commodo placerat. Nam sed erat bibendum, feugiat leo a, mattis leo. Vestibulum mi mauris, rutrum non fringilla eget, cursus sit amet dui. Suspendisse potenti. Mauris condimentum, risus nec mattis sagittis, nunc lorem hendrerit quam, in cursus ex quam ac turpis. In mattis eu sapien id dignissim. In vitae molestie risus. Ut ipsum ipsum, laoreet vel augue quis, sagittis fringilla neque. Suspendisse vehicula diam ut neque bibendum lacinia sit amet nec velit. Sed semper porttitor leo, eget scelerisque justo laoreet et. Fusce quis consequat nisl, sed interdum odio. Sed blandit faucibus diam. Nullam tincidunt purus quis dui ornare scelerisque. Pellentesque placerat volutpat diam. Vivamus ante elit, fermentum nec sagittis in, tempor non arcu. Curabitur convallis, dolor sit amet molestie auctor, metus leo sollicitudin lacus, quis cursus mauris eros non massa. Vestibulum interdum sapien luctus lacus ornare fringilla. Nullam et nibh quis urna ultrices sodales facilisis eget lectus.";

  const descriptionRef = useRef(null);
  const [isTooLong, setIsTooLong] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (descriptionRef && descriptionRef.current) {
      setIsTooLong(descriptionRef.current.isClamped());
    }
  }, [descriptionRef]);

  return (
    <div>
      <Typography variant="h5">Details</Typography>
      <Typography variant="h6">S$10.00</Typography>
      <Typography variant="body1" component="div">
        {!isExpanded && (
          <LinesEllipsis
            text={description}
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="letters"
            ref={descriptionRef}
          />
        )}
        <Collapse in={isExpanded}>{description}</Collapse>
      </Typography>
      {isTooLong && (
        <div className={classes.showMoreButtonContainer}>
          <Button onClick={() => setIsExpanded(!isExpanded)} color="secondary">
            {isExpanded ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
}

function OrderDrawer({ onClose, ...rest }) {
  const classes = useStyles();

  const [quantity, setQuantity] = useState(1);

  return (
    <Drawer {...rest} onClose={onClose} anchor="bottom">
      <Container maxWidth="sm" className={classes.orderDrawerContent}>
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.orderDrawerHeaderContainer}>
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <img
                  className={classes.orderDrawerThumbnail}
                  src="/rectangle.png"
                />
              </Grid>
              <Grid item className={classes.headerTextContainer}>
                <Typography
                  variant="body1"
                  className={classes.orderDrawerTitle}
                >
                  Nasi Kang Kang sosososososoosososososoososo looooong
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.orderDrawerTitle}
                >
                  S$10
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <NumberInput
              required
              label="Quantity"
              value={quantity}
              setValue={setQuantity}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1">Delivery Details</Typography>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <AccessTimeIcon />
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  26th September 2020 9:00AM - 5:00PM
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <AttachMoneyIcon />
              </Grid>
              <Grid item>
                <Typography variant="caption">S$3</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.addToCartButtonContainer}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<ShoppingCartIcon />}
              disabled={quantity <= 0 || quantity === ""}
            >
              Add To Cart
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Drawer>
  );
}
