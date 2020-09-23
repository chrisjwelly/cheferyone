import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import sanitizeHtml from "sanitize-html";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import InfiniteScroll from "../components/InfiniteScroll";
import MenuListCard from "../components/MenuListCard";
import { stringToMoney } from "../utils/general";
import { setTabIndex } from "../actions/bottombar-actions";
import { setSearchSection } from "../actions/search-actions";

const useStyles = makeStyles((theme) => ({
  description: {
    width: "100%",
    overflow: "hidden",
  },
  menuListCard: {
    marginBottom: theme.spacing(2),
  },
  tags: {
    padding: theme.spacing(1, 0, 1, 0),
  },
}));

export default function SearchPage({ isFilter }) {
  const { term, section: searchSection } = useParams();

  const classes = useStyles();
  const dispatch = useDispatch();

  const apiPath = !isFilter
    ? `/api/v1/${searchSection}/search?query=${term}&`
    : `/api/v1/${searchSection}/filter?tags=${term}&`;

  useEffect(() => {
    dispatch(setTabIndex(0));
    dispatch(setSearchSection(searchSection));
  }, [dispatch, searchSection]);

  if (searchSection)
    return (
      <div>
        <Typography variant="h6">{`${
          !isFilter ? "Search" : "Filter"
        } ${searchSection} results`}</Typography>
        <InfiniteScroll apiPath={apiPath}>
          {(data) =>
            data.map((results) =>
              results.map((result, i) => (
                <MenuListCard
                  key={i}
                  name={
                    searchSection === "menus" ? result.name : result.username
                  }
                  image={result.image_url}
                  className={classes.menuListCard}
                  link={
                    searchSection === "menus"
                      ? `/menu/${result.id}/`
                      : `/chef/${result.username}/`
                  }
                >
                  {searchSection === "menus" && (
                    <Typography variant="subtitle2" color="textSecondary">
                      {`S$${stringToMoney(result.price)}`}
                    </Typography>
                  )}
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    component="div"
                    className={classes.description}
                  >
                    <HTMLEllipsis
                      unsafeHTML={
                        result._highlightResult &&
                        result._highlightResult.description &&
                        result._highlightResult.description.value
                          ? sanitizeHtml(
                              result._highlightResult.description.value,
                              {
                                allowedTags: ["em"],
                              }
                            )
                          : result.description
                      }
                      maxLine="2"
                      ellipsis="..."
                      basedOn="letters"
                    />
                  </Typography>
                  {result.location && (
                    <Typography variant="caption">{result.location}</Typography>
                  )}
                  <Grid container spacing={1} className={classes.tags}>
                    {result.tags
                      ? result.tags.map((t, i) => (
                          <Grid item key={i}>
                            <Chip size="small" label={t.name} />
                          </Grid>
                        ))
                      : result.restaurant_tags.map((t, i) => (
                          <Grid item key={i}>
                            <Chip size="small" label={t.name} />
                          </Grid>
                        ))}
                  </Grid>
                </MenuListCard>
              ))
            )
          }
        </InfiniteScroll>
      </div>
    );
}
