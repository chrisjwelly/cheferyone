import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setTabIndex } from "../actions/bottombar-actions";

export default function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabIndex(3));
  }, [dispatch]);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}
