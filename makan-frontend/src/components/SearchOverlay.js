import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";

import { setSearchSection } from "../actions/search-actions";

const useStyles = makeStyles((theme) => ({
  chevronRight: { minWidth: "0" },
  text: { fontWeight: theme.typography.fontWeightBold },
}));

export default function SearchOverlay() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const searchSection = useSelector((store) => store.search.searchSection);
  const otherSection = searchSection === "menus" ? "chefs" : "menus";

  return (
    <ListItem
      button
      className={classes.text}
      onClick={() => dispatch(setSearchSection(otherSection))}
    >
      <ListItemText
        primary={
          <Typography
            className={classes.text}
          >{`Search for ${otherSection} instead`}</Typography>
        }
      />
      <ListItemIcon className={classes.chevronRight}>
        <ChevronRightIcon />
      </ListItemIcon>
    </ListItem>
  );
}
