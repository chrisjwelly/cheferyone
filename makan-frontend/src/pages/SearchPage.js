import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { setIsSearching } from "../actions/search-actions";
import Typography from "@material-ui/core/Typography";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import sanitizeHtml from "sanitize-html";

import InfiniteScroll from "../components/InfiniteScroll";
import MenuListCard from "../components/MenuListCard";

const useStyles = makeStyles((theme) => ({
  description: {
    width: "100%",
    overflow: "hidden",
  },
  menuListCard: {
    marginBottom: theme.spacing(2),
  },
}));

export default function SearchPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isSearching, path } = useSelector((store) => store.search);
  const [searchPath, setSearchPath] = useState(path);
  const [isSShowResults, setIsShowResults] = useState(false);

  useEffect(() => {
    if (isSearching) {
      setIsShowResults(true);
      setSearchPath(path);
      dispatch(setIsSearching(false));
    }
  }, [isSearching, path, dispatch]);

  if (!isSShowResults) {
    return null;
  } else {
    return (
      <InfiniteScroll apiPath={searchPath}>
        {(data) =>
          data.map((results) =>
            results.map((result) => (
              <MenuListCard
                name={result.name}
                image={result.image_link}
                className={classes.menuListCard}
              >
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
                    trimRight
                    basedOn="letters"
                  />
                </Typography>
              </MenuListCard>
            ))
          )
        }
      </InfiniteScroll>
    );
  }
}
