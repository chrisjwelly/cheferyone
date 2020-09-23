import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SelectTag from "./SelectTag";

import {
  setSearchSection,
  setIsShowSearchOverlay,
} from "../actions/search-actions";
import GreenButton from "./GreenButton";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
  chevronRight: { minWidth: "0" },
  text: { fontWeight: theme.typography.fontWeightBold },
}));

export default function SearchOverlay() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const searchSection = useSelector((store) => store.search.searchSection);
  const otherSection = searchSection === "menus" ? "chefs" : "menus";

  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <Container maxWidth="sm" className={classes.root}>
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
      <Container maxWidth="sm">
        <SelectTag
          selected={selectedTags}
          setSelected={setSelectedTags}
          header={`Show ${searchSection} by tags:`}
        />
        {selectedTags.length !== 0 && (
          <GreenButton
            className={classes.filterButton}
            fullWidth
            onClick={() => {
              dispatch(setIsShowSearchOverlay(false));
              history.push(`/filter/${searchSection}/${selectedTags.join(",")}`);
            }}
          >
            {`View filtered ${searchSection}`}
          </GreenButton>
        )}
      </Container>
    </Container>
  );
}
