import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TextField from "@material-ui/core/TextField";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { openSuccessSnackBar } from "../actions/snackbar-actions";
import { usePost } from "../utils/rest-utils";
import NumberInput from "../components/NumberInput";
import { stringToMoney } from "../utils/general";

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
  remarksContainer: {
    width: "100%",
  },
}));

export default function MenuOrderDrawer({
  name,
  image,
  price,
  onClose,
  current_preorder,
  initialQuantity,
  initialRemarks,
  isAddToCart,
  apiPath,
  method,
  ...rest
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [remarks, setRemarks] = useState(initialRemarks || "");

  const post = usePost(
    {
      order: {
        quantity,
        remarks,
        preorder_id: current_preorder.id,
      },
    },
    {},
    apiPath,
    method
  )[1];

  const onSubmit = async () => {
    const res = await post();
    if (res) {
      if (isAddToCart) {
        dispatch(openSuccessSnackBar("Order added to cart!"));
      } else {
        dispatch(openSuccessSnackBar("Order edited"));
        onClose();
      }
      history.push("/");
      history.push("/orders");
    }
  };

  return (
    <Drawer {...rest} onClose={onClose} anchor="bottom">
      <Container maxWidth="sm" className={classes.content}>
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.headerContainer}>
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                {image && (
                  <img alt={name} className={classes.thumbnail} src={image} />
                )}
              </Grid>
              <Grid item className={classes.nameContainer}>
                <Typography variant="body1" className={classes.name}>
                  {name}
                </Typography>
                <Typography variant="body1">{`S$${stringToMoney(
                  price
                )}`}</Typography>
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
            <Typography variant="body1">Collection Details</Typography>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <AccessTimeIcon />
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  {format(
                    new Date(current_preorder.collection_date),
                    "dd MMMM yyyy hh:mma"
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className={classes.remarksContainer}
              label="Remarks"
              multiline
              rows={3}
              variant="outlined"
            />
          </Grid>
          <Grid item className={classes.buttonContainer}>
            {isAddToCart ? (
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<ShoppingCartIcon />}
                disabled={quantity <= 0 || quantity === ""}
                onClick={onSubmit}
              >
                Add To Cart
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                disabled={quantity <= 0 || quantity === ""}
                onClick={onSubmit}
              >
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </Drawer>
  );
}
