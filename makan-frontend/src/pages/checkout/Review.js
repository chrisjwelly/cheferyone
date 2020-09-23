import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Grid from "@material-ui/core/Grid";

import { stringToMoney } from "../../utils/general";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({ data }) {
  const classes = useStyles();

  const total = Object.keys(data).reduce(
    (acc, chef) =>
      data[chef].reduce((acc, order) => acc + Number(order.menu.price), 0) +
      acc,
    0
  );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {Object.keys(data).map((chef, i) => {
          const products = data[chef].map((order) => ({
            name: order.menu.name,
            desc: order.menu.description,
            price: `S$${stringToMoney(order.menu.price)}`,
          }));
          return (
            <div key={i}>
              <Grid container spacing={1} alignItems="center" wrap="nowrap">
                <Grid item>
                  <StorefrontIcon />
                </Grid>
                <Grid item>
                  <Typography variant="caption">{chef}</Typography>
                </Grid>
              </Grid>
              {products.map((product, i) => (
                <ListItem className={classes.listItem} key={i + product.name}>
                  <ListItemText
                    primary={product.name}
                    secondary={product.desc}
                  />
                  <Typography variant="body2">{product.price}</Typography>
                </ListItem>
              ))}
            </div>
          );
        })}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {`S$${stringToMoney(total)}`}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
