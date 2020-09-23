import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
import _ from "lodash";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import { useGet } from "../utils/rest-utils";
import OrderCard from "../components/OrderCard";
import LoadingCenter from "../components/LoadingCenter";
import { uppercaseFirst } from "../utils/general";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  transactionInfo: {
    marginBottom: theme.spacing(2),
  },
  menuListCard: {
    marginBottom: theme.spacing(2),
  },
  description: {
    width: "100%",
    overflow: "hidden",
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
  green: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },
  red: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
  },
}));

export default function PaidOrders() {
  const classes = useStyles();
  const { isLoading, data } = useGet("/api/v1/orders");
  const history = useHistory();

  if (isLoading) {
    return <LoadingCenter />;
  } else if (_.isEmpty(data)) {
    return (
      <Typography variant="caption" color="textSecondary">
        It seems a little lonely here... Add some food to your cart!
      </Typography>
    );
  } else {
    return Object.keys(data)
      .reverse()
      .map((transactionId, i) => {
        const transaction = data[transactionId];

        return (
          <Paper className={classes.paper} key={i}>
            <Grid container className={classes.transactionInfo}>
              <Grid item>
                <Typography variant="caption">
                  {`Transaction #${transactionId}`}
                </Typography>
              </Grid>
            </Grid>
            {Object.keys(transaction).map((restaurantName, i) => {
              return (
                <div key={i + restaurantName}>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    component={Link}
                    to={`/chef/${restaurantName}`}
                    className={classes.restaurantNameGrid}
                  >
                    <Grid item>
                      <Typography variant="h6">{restaurantName}</Typography>
                    </Grid>
                    <Grid item>
                      <ChevronRightIcon fontSize="large" />
                    </Grid>
                  </Grid>
                  {transaction[restaurantName].map((order, i) => (
                    <OrderCard order={order} key={i}>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <Typography variant="caption">Status: </Typography>
                        </Grid>
                        <Grid item>
                          <Chip
                            className={clsx(
                              order.status === "paid" && classes.green,
                              order.status === "ended" && classes.green
                            )}
                            color={
                              order.status === "completed"
                                ? "primary"
                                : order.status === "confirmed"
                                ? "secondary"
                                : undefined
                            }
                            size="small"
                            label={uppercaseFirst(order.status)}
                          ></Chip>
                        </Grid>
                        {order.status === "completed" && (
                          <Grid item xs={12}>
                            <Button
                              color="secondary"
                              size="small"
                              onClick={(e) => {
                                e.preventDefault();
                                history.push(`/menu/${order.id}/review`);
                              }}
                            >
                              Review
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </OrderCard>
                  ))}
                </div>
              );
            })}
          </Paper>
        );
      });
  }
}
