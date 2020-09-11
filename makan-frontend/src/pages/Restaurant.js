import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setTabIndex } from "../actions/bottombar-actions";

export default function Restaurant() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabIndex(1));
  }, [dispatch]);

  return (
    <div>
      <h1>Restaurant</h1>
    </div>
  );
}
