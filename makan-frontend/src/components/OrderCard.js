import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MenuListCard from "../components/MenuListCard";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { format } from "date-fns";

import { stringToMoney } from "../utils/general";

const useStyles = makeStyles((theme) => ({
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
}));

export default function OrderCard({ order, children }) {
  const classes = useStyles();
  const { id, name, image_url, price } = order.menu;

  return (
    <MenuListCard
      name={name}
      link={`/menu/${id}`}
      image={image_url}
      className={classes.menuListCard}
    >
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="caption">
            {`S$${stringToMoney(price)}`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">{`x${order.quantity}`}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="caption">{`Customer email: ${order.email}`}</Typography>
      </Grid>
      {order.remarks !== "" && (
        <Accordion
          classes={{
            root: classes.remarks,
            expanded: classes.remarksExpanded,
          }}
          onClick={(e) => e.preventDefault()}
        >
          <AccordionSummary
            className={classes.remarksSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={classes.heading} variant="subtitle2">
              Remarks
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.remarksDetails}>
            <Typography className={classes.remarksText} variant="caption">
              {order.remarks}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}
      {children}
      <Typography variant="caption">
        {`Updated at: ${format(new Date(order.updated_at), "dd/MM/yy hh:mma")}`}
      </Typography>
    </MenuListCard>
  );
}
