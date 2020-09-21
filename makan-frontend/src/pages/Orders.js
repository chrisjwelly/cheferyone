import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import RenderResponse from "../components/RenderResponse";
import { setTabIndex } from "../actions/bottombar-actions";
import { openDialog, closeDialog } from "../actions/dialog-actions";
import { useGet, usePost } from "../utils/rest-utils";
import { openSuccessSnackBar } from "../actions/snackbar-actions";
import OrderCard from "../components/OrderCard";
import MenuOrderDrawer from "../components/MenuOrderDrawer";

const useStyles = makeStyles((theme) => ({
  menuListCard: {
    marginBottom: theme.spacing(2),
  },
  description: {
    width: "100%",
    overflow: "hidden",
  },
  restaurantName: {
    padding: theme.spacing(2),
  },
  restaurantNameContainer: {
    marginBottom: theme.spacing(1),
  },
  restaurantNameGrid: {
    textDecoration: "none",
    color: theme.palette.common.black,
  },
  remarks: {
    padding: 0,
    boxShadow: theme.shadows[0],
    "&::before": {
      backgroundColor: theme.palette.common.white,
    },
  },
  remarksSummary: { padding: 0 },
  remarksDetails: { padding: 0 },
  remarksExpanded: {
    margin: 0,
  },
  remarksText: {
    overflowWrap: "anywhere",
  },
}));

export default function Orders() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabIndex(2));
  }, [dispatch]);

  const res = useGet("/api/v1/cart");

  const [editing, setEditing] = useState({
    isEditing: false,
    apiPath: "",
    name: "",
    image: "",
    price: "",
    image_url: "",
    current_preorder: null,
    quantity: 0,
    remarks: "",
  });

  const [deleteId, setDeleteId] = useState(null);

  const deletePost = usePost({}, {}, `/api/v1/orders/${deleteId}`, "DELETE")[1];

  useEffect(() => {
    if (deleteId) {
      dispatch(
        openDialog(
          "Delete Order From Cart??",
          "This action is irreversible!",
          <>
            <Button
              color="primary"
              onClick={() => {
                dispatch(closeDialog());
                setDeleteId(null);
              }}
            >
              No
            </Button>
            <Button
              color="primary"
              onClick={async () => {
                dispatch(closeDialog());
                const res = await deletePost();

                if (res) {
                  dispatch(openSuccessSnackBar("Order deleted!"));
                  history.push("/");
                  history.push("/orders");
                }
                dispatch(closeDialog());
                setDeleteId(null);
              }}
            >
              Yes
            </Button>
          </>
        )
      );
    }
  }, [deleteId, deletePost, dispatch, history]);

  return (
    <RenderResponse {...res}>
      {(data) =>
        Object.keys(data).map((restaurantName, i) => {
          return (
            <div key={i + restaurantName}>
              <Card className={classes.restaurantNameContainer}>
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  component={Link}
                  to="/placeholder"
                  className={classes.restaurantNameGrid}
                >
                  <Grid item>
                    <Typography className={classes.restaurantName} variant="h6">
                      {restaurantName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <ChevronRightIcon fontSize="large" />
                  </Grid>
                </Grid>
              </Card>
              {data[restaurantName].map((order, i) => (
                <OrderCard order={order} key={i}>
                  <Grid container>
                    <Grid item>
                      <IconButton
                        fontSize="small"
                        onClick={(e) => {
                          e.preventDefault();
                          setEditing({
                            isEditing: true,
                            name: order.menu.name,
                            image_url: order.menu.image_url,
                            price: order.menu.price,
                            current_preorder: order.menu.current_preorder,
                            apiPath: `/api/v1/orders/${order.id}`,
                            quantity: order.quantity,
                            remarks: order.remarks,
                          });
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        fontSize="small"
                        onClick={(e) => {
                          e.preventDefault();
                          setDeleteId(order.id);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </OrderCard>
              ))}
              {editing.isEditing && (
                <MenuOrderDrawer
                  open={editing.isEditing}
                  onClose={() => setEditing({ isEditing: false })}
                  name={editing.name}
                  image={editing.image_url}
                  price={editing.price}
                  current_preorder={editing.current_preorder}
                  apiPath={editing.apiPath}
                  method="PATCH"
                  initialQuantity={editing.quantity}
                  initialRemarks={editing.remarks}
                />
              )}
            </div>
          );
        })
      }
    </RenderResponse>
  );
}
