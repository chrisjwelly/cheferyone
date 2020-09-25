import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: theme.zIndex.modal,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
  button: {
    width: theme.spacing(8),
  },
}));

export default function LoginPrompt() {
  const classes = useStyles();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapse in={isOpen}>
      <Paper className={classes.root} elevation={3}>
        <Grid container alignContent="center" spacing={2}>
          <Grid item xs={12} className={classes.right}>
            <IconButton size="small" onClick={() => setIsOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Typography>
              Everyone can be a chef. Join Cheferyone today!
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              onClick={() => {
                setIsOpen(false);
                history.push("/register");
              }}
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setIsOpen(false);
                history.push("/login");
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Collapse>
  );
}
