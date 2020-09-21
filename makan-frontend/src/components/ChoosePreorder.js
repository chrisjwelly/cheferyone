import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

import { openDialog, closeDialog } from "../actions/dialog-actions";
import { PreorderCard, PreorderEdit } from "../components/Preorders";

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

export default function ChoosePreorder({
  existingPreorders,
  currentPreorder,
  new_preorders,
  setNewPreorders,
  edited_preorders,
  setEditedPreorders,
  deleted_preorders,
  setDeletedPreorders,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [displayedPreorders, setDisplayedPreorders] = useState([
    ...existingPreorders,
  ]);

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
    dispatch(
      openDialog(
        "",
        "Delete pre-order?",
        <>
          <Button color="primary" onClick={() => dispatch(closeDialog())}>
            No
          </Button>
          <Button
            color="primary"
            onClick={() => {
              if (preorder.status === NEW) {
                setNewPreorders(
                  new_preorders.filter((p) => p.id !== preorder.id)
                );
              } else if (preorder.status === EDIT) {
                setEditedPreorders(
                  edited_preorders.filter((p) => p.id !== preorder.id)
                );
                setDeletedPreorders([...deleted_preorders, preorder.id]);
              } else {
                setDeletedPreorders([...deleted_preorders, preorder.id]);
              }

              dispatch(closeDialog());
            }}
          >
            Yes
          </Button>
        </>
      )
    );
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
          onEdit={preorder.id === currentPreorder.id ? undefined : onEdit}
          onDelete={preorder.id === currentPreorder.id ? undefined : onDelete}
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

    withNew.sort((p1, p2) => new Date(p1.start_date) - new Date(p2.start_date));
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
            size="small"
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
        {displayedPreorders.length > 0 ? (
          <Grid item container spacing={2}>
            {displayedPreorders.map(genCard)}
          </Grid>
        ) : (
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              It seems a little lonely here...
            </Typography>
          </Grid>
        )}
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
