import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import NumberInput from "../components/NumberInput";

const useStyles = makeStyles((theme) => ({
  content: {
    overflowY: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  headerContainer: {
    width: "100%",
  },
  thumbnail: {
    objectFit: "cover",
    height: theme.breakpoints.values.sm / 7,
    width: theme.breakpoints.values.sm / 7,
    boxShadow: theme.shadows[1],
  },
  name: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  buttonContainer: {
    textAlign: "center",
  },
  nameContainer: {
    marginLeft: theme.spacing(1),
    overflow: "hidden",
  },
  button: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
    color: theme.palette.common.white,
  },
}));

export default function MenuOrderDrawer({
  name,
  image,
  price,
  deliveryFee,
  onClose,
  deliveryDate,
  ...rest
}) {
  const classes = useStyles();

  const [quantity, setQuantity] = useState(1);

  return (
    <Drawer {...rest} onClose={onClose} anchor="bottom">
      <Container maxWidth="sm" className={classes.content}>
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.headerContainer}>
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <img alt={name} className={classes.thumbnail} src={image} />
              </Grid>
              <Grid item className={classes.nameContainer}>
                <Typography variant="body1" className={classes.name}>
                  {name}
                </Typography>
                <Typography variant="body1">{`S$${price}`}</Typography>
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
                <Typography variant="caption">{deliveryDate}</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <AttachMoneyIcon />
              </Grid>
              <Grid item>
                <Typography variant="caption">{`S$${deliveryFee}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.buttonContainer}>
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
