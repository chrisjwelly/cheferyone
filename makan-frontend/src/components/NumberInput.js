import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.common.black,
  },
  buttonDisabled: {
    color: theme.palette.action.disabled,
  },
}));

export default function NumberInput({ value, setValue, ...rest }) {
  const classes = useStyles();

  const updateValue = (newValue) => {
    if (newValue === "") {
      setValue(newValue);
    } else if (
      newValue > 0 &&
      !isNaN(newValue) &&
      newValue <= Number.MAX_SAFE_INTEGER
    ) {
      setValue(parseInt(newValue));
    }
  };

  const isIncrementDisabled = () =>
    value === "" || value >= Number.MAX_SAFE_INTEGER;
  const isDecrementDisabled = () => value === "" || value === 1;

  return (
    <Grid container alignItems="center" wrap="nowrap" spacing={1}>
      <Grid item>
        <IconButton
          aria-label="decrement"
          disabled={isDecrementDisabled()}
          onClick={() => updateValue(value - 1)}
          size="small"
        >
          <RemoveCircleIcon
            className={
              isDecrementDisabled() ? classes.buttonDisabled : classes.button
            }
          />
        </IconButton>
      </Grid>
      <Grid item>
        <TextField
          {...rest}
          value={value}
          onChange={(e) => updateValue(e.target.value)}
        />
      </Grid>
      <Grid item>
        <IconButton
          disabled={isIncrementDisabled()}
          aria-label="increment"
          onClick={() => updateValue(value + 1)}
          size="small"
        >
          <AddCircleIcon
            className={
              isIncrementDisabled() ? classes.buttonDisabled : classes.button
            }
          />
        </IconButton>
      </Grid>
    </Grid>
  );
}
