import { OPEN_DIALOG, CLOSE_DIALOG } from "./types";

export const openDialog = (title, body, actions) => {
  return {
    type: OPEN_DIALOG,
    title,
    body,
    actions: actions,
  };
};

export const closeDialog = () => {
  return {
    type: CLOSE_DIALOG,
  };
};
