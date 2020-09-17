import { OPEN_DIALOG, CLOSE_DIALOG } from "../actions/types";

const initialState = { isOpen: false, title: "", body: "", actions: null };

export default function dialogReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        isOpen: true,
        title: action.title,
        body: action.body,
        actions: action.actions,
      };
    case CLOSE_DIALOG:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
