import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
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

export default function SearchPage() {
  const { term } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabIndex(0));
  }, [dispatch]);

  return (
    <InfiniteScroll apiPath={`/api/v1/menus/search?query=${term}&`}>
      {(data) =>
        data.map((results) =>
          results.map((result, i) => (
            <MenuListCard
              key={i}
              name={result.name}
              image={result.image_url}
              className={classes.menuListCard}
              link={`/menu/${result.id}/`}
            >
              <Typography variant="subtitle2" color="textSecondary">
                {`S$${stringToMoney(result.price)}`}
              </Typography>
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
                <Grid container spacing={1} className={classes.tags}>
                  {result.tags.map((t, i) => (
                    <Grid item key={i}>
                      <Chip size="small" label={t.name} />
                    </Grid>
                  ))}
                </Grid>
              </Typography>
            </MenuListCard>
          ))
        )
      }
    </InfiniteScroll>
  );
}
