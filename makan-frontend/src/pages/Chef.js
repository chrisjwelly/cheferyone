import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import MenuListCard from "../components/MenuListCard";
import LinesEllipsis from "react-lines-ellipsis";
import { useParams } from "react-router-dom";

import InfiniteScroll from "../components/InfiniteScroll";
import { setTabIndex } from "../actions/bottombar-actions";
import { stringToMoney } from "../utils/general";

const useStyles = makeStyles((theme) => ({
  root: { paddingTop: theme.spacing(6) },
  menuListCard: {
    marginBottom: theme.spacing(2),
  },
  description: {
    width: "100%",
    overflow: "hidden",
  },
}));

export default function Chef() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { username } = useParams();

  useEffect(() => {
    dispatch(setTabIndex(0));
  }, [dispatch]);

  return (
    <div>
      <InfiniteScroll apiPath={`/api/v1/chefs/${username}/menus`}>
        {(data) =>
          data.map((menus) => {
            return menus.map((menu) => (
              <MenuListCard
                className={classes.menuListCard}
                key={menu.id}
                name={menu.name}
                link={`/menu/${menu.id}`}
                image={menu.image_url}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {`S$${stringToMoney(menu.price)}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  component="div"
                  className={classes.description}
                >
                  <LinesEllipsis
                    text={menu.description}
                    maxLine="2"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </Typography>
                <Typography variant="subtitle2">
                  {`Status: ${menu.current_preorder ? "Open" : "Closed"}`}
                </Typography>
              </MenuListCard>
            ));
          })
        }
      </InfiniteScroll>
    </div>
  );
}
