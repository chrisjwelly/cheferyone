import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SvgIcon from "@material-ui/core/SvgIcon";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import { v4 as uuidv4 } from "uuid";

import NumberInput from "./NumberInput";

const FORMAT = "dd/MMM/yy hh:mma";
const NEW = "NEW";
const EDIT = "EDIT";
const getEmptyPreorder = () => ({
  status: NEW,
  id: uuidv4(),
  start_date: new Date().toString(),
  end_date: new Date().toString(),
  collection_date: new Date().toString(),
  quota: 1,
});

const useStyles = makeStyles((theme) => ({
  marginRight: {
    marginRight: theme.spacing(1),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  numberInput: {
    width: theme.spacing(12),
  },
  addButton: {
    color: theme.palette.common.black,
  },
}));

export default function ChoosePreorder({ existingPreorders }) {
  const classes = useStyles();

  const [displayedPreorders, setDisplayedPreorders] = useState([
    ...existingPreorders,
  ]);
  const [new_preorders, setNewPreorders] = useState([]);
  const [edited_preorders, setEditedPreorders] = useState([]);
  const [deleted_preorders, setDeletedPreorders] = useState([]);

  const [editing, setEditing] = useState({});
  const [adding, setAdding] = useState(getEmptyPreorder());
  const [isAdding, setIsAdding] = useState(false);
  const [editingNew, setEditingNew] = useState({});

  const onEdit = (preorder) => {
    if (preorder.status === NEW) {
      setEditingNew({ ...editingNew, [preorder.id]: preorder });
    } else {
      setEditing({
        ...editing,
        [preorder.id]: { status: EDIT, ...preorder },
      });
    }
  };
  const onDelete = (preorder) => {
    if (preorder.status === NEW) {
      setNewPreorders(new_preorders.filter((p) => p.id !== preorder.id));
    } else if (preorder.status === EDIT) {
      setEditedPreorders(edited_preorders.filter((p) => p.id !== preorder.id));
    } else {
      setDeletedPreorders([...deleted_preorders, preorder.id]);
    }
  };

  const closeEdit = (preorder) => {
    if (preorder.status === NEW) {
      const newEditingNew = { ...editingNew };
      delete newEditingNew[preorder.id];
      setEditingNew(newEditingNew);
    } else {
      const newEditing = { ...editing };
      delete newEditing[preorder.id];
      setEditing(newEditing);
    }
  };
  const doneEdit = (preorder) => {
    if (preorder.status === NEW) {
      const oldAddsRemoved = new_preorders.filter((p) => p.id !== preorder.id);
      setNewPreorders([...oldAddsRemoved, preorder]);
    } else {
      const oldEditsRemoved = edited_preorders.filter(
        (p) => p.id !== preorder.id
      );
      setEditedPreorders([...oldEditsRemoved, preorder]);
    }

    closeEdit(preorder);
  };

  const closeNew = () => {
    setAdding(getEmptyPreorder());
    setIsAdding(false);
  };
  const doneNew = (preorder) => {
    setNewPreorders([...new_preorders, preorder]);
    closeNew(preorder);
  };

  const genCard = (preorder, i) => {
    if (preorder.status === NEW && preorder.id in editingNew) {
      return (
        <Grid item key={i} xs={12} sm={6}>
          <PreorderEdit
            preorder={editingNew[preorder.id]}
            setPreorder={(p) =>
              setEditingNew({ ...editingNew, [preorder.id]: p })
            }
            index={i}
            onDone={doneEdit}
            onClose={closeEdit}
          />
        </Grid>
      );
    } else if (preorder.id in editing) {
      return (
        <Grid item key={i} xs={12} sm={6}>
          <PreorderEdit
            preorder={editing[preorder.id]}
            setPreorder={(p) => setEditing({ ...editing, [preorder.id]: p })}
            index={i}
            onDone={doneEdit}
            onClose={closeEdit}
          />
        </Grid>
      );
    }
    return (
      <Grid item key={i} xs={12} sm={6}>
        <PreorderCard
          index={i}
          preorder={preorder}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Grid>
    );
  };

  useEffect(() => {
    const withEdited = existingPreorders.map((p) => {
      const edited = edited_preorders.find((e) => e.id === p.id);
      if (edited) {
        return edited;
      } else {
        return p;
      }
    });

    const removeDeleted = withEdited.filter(
      (p) => !deleted_preorders.includes(p.id)
    );

    const withNew = [...removeDeleted, ...new_preorders];

    withNew.sort((p1, p2) => p2.start_date - p1.start_date);
    setDisplayedPreorders(withNew);
  }, [new_preorders, edited_preorders, deleted_preorders, existingPreorders]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="h6">Pre-orders</Typography>
        </Grid>
        <Grid item>
          <IconButton
            className={classes.addButton}
            onClick={() => setIsAdding(true)}
            disabled={isAdding}
          >
            <AddCircleIcon />
          </IconButton>
        </Grid>
        <Collapse in={isAdding}>
          <Grid item xs={12}>
            <PreorderEdit
              className={classes.marginBottom}
              preorder={adding}
              setPreorder={(p) => setAdding({ ...p })}
              onDone={doneNew}
              onClose={closeNew}
            />
          </Grid>
        </Collapse>
        <Grid item container spacing={2}>
          {displayedPreorders.map(genCard)}
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

function PreorderCard({ preorder, index, onEdit, onDelete, ...rest }) {
  const classes = useStyles();
  return (
    <Card {...rest}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {`Pre-order #${index + 1}`}
        </Typography>
        <Grid container wrap="nowrap" alignItems="center">
          <Grid item className={classes.marginRight}>
            <AccessTimeIcon color="disabled" />
          </Grid>
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              Pre-order from
            </Typography>
            <Typography variant="body2">
              {format(new Date(preorder.start_date), FORMAT)}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              to
            </Typography>
            <Typography variant="body2">
              {format(new Date(preorder.end_date), FORMAT)}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          wrap="nowrap"
          alignItems="center"
          className={classes.marginTop}
        >
          <Grid item className={classes.marginRight}>
            <PickupIcon color="disabled" />
          </Grid>
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              Collect on
            </Typography>
            <Typography variant="body2">
              {format(new Date(preorder.collection_date), FORMAT)}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          wrap="nowrap"
          alignItems="center"
          className={classes.marginTop}
        >
          <Grid item className={classes.marginRight}>
            <QuantityIcon color="disabled" />
          </Grid>
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              Quantity
            </Typography>
            <Typography variant="body2">{preorder.quota}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <IconButton onClick={(preorder) => onEdit(preorder)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={(preorder) => onDelete(preorder)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function PreorderEdit({
  preorder,
  setPreorder,
  index,
  onDone,
  onClose,
  ...rest
}) {
  const classes = useStyles();

  const setStart = (date) => {
    setPreorder({
      ...preorder,
      start_date: date.toString(),
    });
  };
  const setEnd = (date) => {
    setPreorder({
      ...preorder,
      end_date: date.toString(),
    });
  };
  const setCollection = (date) => {
    setPreorder({
      ...preorder,
      collection_date: date.toString(),
    });
  };
  const setQuota = (quota) => {
    setPreorder({
      ...preorder,
      quota,
    });
  };

  return (
    <Card {...rest}>
      <CardContent>
        {index !== undefined && (
          <Typography color="textSecondary" gutterBottom>
            {`Pre-order #${index + 1}`}
          </Typography>
        )}
        <Grid container wrap="nowrap" alignItems="center">
          <Grid item className={classes.marginRight}>
            <AccessTimeIcon color="disabled" />
          </Grid>
          <Grid item>
            <DateTimePicker
              className={classes.marginRight}
              variant="inline"
              margin="normal"
              label="Pre-order from"
              format={FORMAT}
              disablePast
              value={preorder.start_date}
              onChange={setStart}
            />
            <DateTimePicker
              variant="inline"
              margin="normal"
              label="to"
              format={FORMAT}
              disablePast
              value={preorder.end_date}
              onChange={setEnd}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap="nowrap"
          alignItems="center"
          className={classes.marginTop}
        >
          <Grid item className={classes.marginRight}>
            <PickupIcon color="disabled" />
          </Grid>
          <Grid item>
            <DateTimePicker
              variant="inline"
              margin="normal"
              label="Collect on"
              format={FORMAT}
              disablePast
              value={preorder.collection_date}
              onChange={setCollection}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap="nowrap"
          alignItems="center"
          className={classes.marginTop}
        >
          <Grid item className={classes.marginRight}>
            <QuantityIcon color="disabled" />
          </Grid>
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              Quantity
            </Typography>
            <NumberInput
              className={classes.numberInput}
              value={preorder.quota}
              setValue={setQuota}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onClose(preorder)}>
          <CloseIcon />
        </IconButton>
        <IconButton
          onClick={() => onDone(preorder)}
          disabled={
            new Date(preorder.start_date) >= new Date(preorder.end_date) ||
            new Date(preorder.collection_date) <= new Date(preorder.end_date) ||
            new Date(preorder.start_date) < new Date() ||
            preorder.quota === ""
          }
        >
          <DoneIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function PickupIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M 23.433594 17.726562 C 23.113281 17.4375 22.707031 17.304688 22.296875 17.351562 C 21.933594 17.394531 21.507812 17.464844 21.046875 17.554688 L 21.046875 6.089844 C 21.046875 5.3125 20.414062 4.675781 19.632812 4.675781 L 17.367188 4.675781 L 17.367188 3.304688 C 17.367188 1.578125 15.960938 0.171875 14.230469 0.171875 C 12.503906 0.171875 11.097656 1.578125 11.097656 3.304688 L 11.097656 4.675781 L 8.832031 4.675781 C 8.050781 4.675781 7.417969 5.3125 7.417969 6.089844 L 7.417969 13.433594 C 6.417969 13.609375 5.140625 14 4.109375 14.878906 C 3.769531 15.171875 3.5 15.445312 3.28125 15.695312 C 3.054688 15.410156 2.703125 15.226562 2.308594 15.226562 L 0.535156 15.226562 C 0.238281 15.226562 0 15.464844 0 15.757812 L 0 23.296875 C 0 23.4375 0.0546875 23.574219 0.15625 23.671875 C 0.257812 23.773438 0.390625 23.828125 0.535156 23.828125 L 2.308594 23.828125 C 2.996094 23.828125 3.554688 23.269531 3.554688 22.582031 L 3.554688 22.171875 C 4.085938 22.207031 5.289062 22.335938 7.835938 22.816406 C 10.84375 23.378906 12.71875 23.570312 14.199219 23.570312 C 15.257812 23.570312 16.113281 23.472656 17.03125 23.34375 C 18.171875 23.183594 19.601562 22.777344 20.863281 22.421875 C 21.449219 22.257812 22 22.101562 22.488281 21.976562 C 23.804688 21.644531 24 20.816406 24 20.351562 L 24 18.992188 C 24 18.515625 23.789062 18.039062 23.433594 17.726562 Z M 12.164062 3.304688 C 12.164062 2.164062 13.09375 1.238281 14.230469 1.238281 C 15.371094 1.238281 16.300781 2.164062 16.300781 3.304688 L 16.300781 4.675781 L 12.164062 4.675781 Z M 8.484375 6.089844 C 8.484375 5.898438 8.640625 5.742188 8.832031 5.742188 L 11.097656 5.742188 L 11.097656 6.921875 C 11.097656 7.214844 11.335938 7.453125 11.632812 7.453125 C 11.925781 7.453125 12.164062 7.214844 12.164062 6.921875 L 12.164062 5.742188 L 16.300781 5.742188 L 16.300781 6.921875 C 16.300781 7.214844 16.539062 7.453125 16.832031 7.453125 C 17.128906 7.453125 17.367188 7.214844 17.367188 6.921875 L 17.367188 5.742188 L 19.632812 5.742188 C 19.824219 5.742188 19.980469 5.898438 19.980469 6.089844 L 19.980469 17.714844 C 19.980469 17.730469 19.980469 17.75 19.984375 17.765625 C 19.902344 17.78125 19.820312 17.800781 19.742188 17.816406 C 18.445312 18.082031 17.109375 18.359375 16.082031 18.421875 C 15.199219 18.480469 13.585938 18.246094 13.105469 17.996094 C 12.785156 17.828125 12.605469 17.621094 12.503906 17.4375 L 14.492188 17.4375 C 15.3125 17.4375 15.976562 16.773438 15.976562 15.953125 L 15.976562 14.785156 C 15.976562 13.964844 15.3125 13.296875 14.492188 13.296875 L 9.042969 13.296875 C 8.988281 13.296875 8.785156 13.292969 8.484375 13.308594 Z M 2.488281 22.582031 C 2.488281 22.683594 2.40625 22.761719 2.308594 22.761719 L 1.066406 22.761719 L 1.066406 16.292969 L 2.308594 16.292969 C 2.40625 16.292969 2.488281 16.375 2.488281 16.472656 Z M 22.933594 20.351562 C 22.933594 20.464844 22.933594 20.765625 22.226562 20.941406 C 21.722656 21.070312 21.164062 21.226562 20.574219 21.394531 C 19.34375 21.742188 17.949219 22.136719 16.882812 22.289062 C 14.785156 22.582031 13.035156 22.707031 8.03125 21.765625 C 5.460938 21.285156 4.183594 21.136719 3.554688 21.105469 L 3.554688 17.144531 C 3.574219 17.121094 3.589844 17.09375 3.605469 17.066406 C 3.742188 16.816406 4.082031 16.308594 4.800781 15.691406 C 6.445312 14.289062 8.988281 14.363281 9.015625 14.363281 C 9.019531 14.367188 9.027344 14.367188 9.035156 14.367188 L 14.492188 14.367188 C 14.722656 14.367188 14.910156 14.554688 14.910156 14.785156 L 14.910156 15.953125 C 14.910156 16.183594 14.722656 16.371094 14.492188 16.371094 L 9.035156 16.371094 C 8.742188 16.371094 8.5 16.609375 8.5 16.90625 C 8.5 17.199219 8.742188 17.4375 9.035156 17.4375 L 11.371094 17.4375 C 11.480469 17.875 11.78125 18.507812 12.613281 18.941406 C 13.371094 19.339844 15.25 19.542969 16.148438 19.488281 C 17.25 19.417969 18.625 19.136719 19.957031 18.859375 C 20.890625 18.667969 21.773438 18.484375 22.417969 18.414062 C 22.554688 18.398438 22.660156 18.464844 22.722656 18.519531 C 22.851562 18.636719 22.933594 18.816406 22.933594 18.992188 Z M 22.933594 20.351562 " />
    </SvgIcon>
  );
}

function QuantityIcon(props) {
  return (
    <SvgIcon {...props}>
      <g>
        <path d="M 23.53125 6.363281 L 12.378906 0.785156 C 12.140625 0.667969 11.859375 0.667969 11.621094 0.785156 L 0.46875 6.363281 C 0.179688 6.507812 0 6.800781 0 7.121094 L 0 22.457031 C 0 22.925781 0.378906 23.304688 0.84375 23.304688 L 3.632812 23.304688 C 4.101562 23.304688 4.480469 22.925781 4.480469 22.457031 L 4.480469 9.359375 L 19.519531 9.359375 L 19.519531 22.457031 C 19.519531 22.925781 19.898438 23.304688 20.367188 23.304688 L 23.15625 23.304688 C 23.621094 23.304688 24 22.925781 24 22.457031 L 24 7.121094 C 24 6.800781 23.820312 6.507812 23.53125 6.363281 Z M 22.308594 21.613281 L 21.210938 21.613281 L 21.210938 8.515625 C 21.210938 8.046875 20.832031 7.667969 20.367188 7.667969 L 3.632812 7.667969 C 3.167969 7.667969 2.789062 8.046875 2.789062 8.515625 L 2.789062 21.613281 L 1.691406 21.613281 L 1.691406 7.640625 L 12 2.488281 L 22.308594 7.640625 Z M 22.308594 21.613281 " />
        <path d="M 17.578125 10.710938 L 12 10.710938 C 11.671875 10.710938 11.410156 10.976562 11.410156 11.304688 L 11.410156 16.289062 L 6.421875 16.289062 C 6.097656 16.289062 5.832031 16.554688 5.832031 16.878906 L 5.832031 22.457031 C 5.832031 22.785156 6.097656 23.050781 6.421875 23.050781 L 17.578125 23.050781 C 17.902344 23.050781 18.167969 22.785156 18.167969 22.457031 L 18.167969 11.304688 C 18.167969 10.976562 17.902344 10.710938 17.578125 10.710938 Z M 12.589844 18.308594 L 13.953125 19.667969 L 12.589844 21.03125 Z M 11.410156 21.03125 L 10.046875 19.667969 L 11.410156 18.308594 Z M 13.429688 17.472656 L 16.148438 17.472656 L 14.789062 18.832031 Z M 13.429688 16.289062 L 14.789062 14.929688 L 16.148438 16.289062 Z M 16.984375 15.453125 L 15.625 14.089844 L 16.984375 12.730469 Z M 14.789062 13.253906 L 13.429688 11.894531 L 16.148438 11.894531 Z M 13.953125 14.089844 L 12.589844 15.453125 L 12.589844 12.730469 Z M 9.210938 18.832031 L 7.851562 17.472656 L 10.570312 17.472656 Z M 8.375 19.667969 L 7.015625 21.03125 L 7.015625 18.308594 Z M 9.210938 20.503906 L 10.570312 21.867188 L 7.851562 21.867188 Z M 14.789062 20.503906 L 16.148438 21.867188 L 13.429688 21.867188 Z M 15.625 19.667969 L 16.984375 18.308594 L 16.984375 21.03125 Z M 15.625 19.667969 " />
      </g>
    </SvgIcon>
  );
}
