import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";

import InfiniteScroll from "../components/InfiniteScroll";
import RatingStars from "../components/RatingStars";
import CollapsibleText from "../components/CollapsibleText";

const useStyles = makeStyles((theme) => ({
  reviewCard: {
    marginBottom: theme.spacing(1),
  },
  content: {
    overflowWrap: "anywhere",
  },
}));

export default function MenuReviews({ id }) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5">Reviews</Typography>
      <InfiniteScroll apiPath={`/api/v1/menus/${id}/reviews`}>
        {(data) =>
          data.map((reviews) =>
            reviews.map((review, i) => (
              <Card key={i} className={classes.reviewCard}>
                <CardContent>
                  <Typography variant="caption">{review.email}</Typography>
                  <Grid container spacing={2} wrap="nowrap">
                    <Grid item>
                      <RatingStars size="small" rating={review.rating} />
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">
                        {`Ordered on: ${format(
                          new Date(review.created_at),
                          "dd/MM/yy"
                        )}`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    className={classes.content}
                    variant="caption"
                    component="div"
                  >
                    <CollapsibleText text={review.content} />
                  </Typography>
                </CardContent>
              </Card>
            ))
          )
        }
      </InfiniteScroll>
    </div>
  );
}
